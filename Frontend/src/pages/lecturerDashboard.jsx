import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

// Parse the QR text format: DEPT_ACADYEAR_YEAR_SEMESTER_SUBJECTCODE
function parseQrCode(text) {
    const parts = text.split('_');
    if (parts.length < 5) return null;
    return {
        department: parts[0],
        academicYear: parts[1],
        year: parts[2],
        semester: parts[3],
        subject: parts.slice(4).join('_'),
    };
}

const LecturerDashboard = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [lecturer, setLecturer] = useState(null);
    const [token, setToken] = useState('');

    // Scan state
    const [scanning, setScanning] = useState(false);
    const [scannedSession, setScannedSession] = useState(null);
    const scannerRef = useRef(null);
    const scannerInstanceRef = useRef(null);

    // Manual student attendance
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [attendees, setAttendees] = useState([]);

    // History
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('scan'); // 'scan' | 'history'

    useEffect(() => {
        const t = localStorage.getItem('lecturertoken');
        const info = localStorage.getItem('lecturerinfo');
        if (!t || !info) {
            navigate('/lecturer_login');
            return;
        }
        setToken(t);
        setLecturer(JSON.parse(info));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (activeTab === 'history' && token) {
            fetchHistory();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, token]);

    async function fetchHistory() {
        setHistoryLoading(true);
        try {
            const lecturerInfo = JSON.parse(localStorage.getItem('lecturerinfo') || '{}');
            const res = await fetch(`http://localhost:1337/api/attendance?lecturerId=${lecturerInfo.id}`, {
                headers: { 'x-access-token': token },
            });
            const data = await res.json();
            if (data.status === 'ok') setHistory(data.records);
        } catch {
            enqueueSnackbar('Could not load history', { variant: 'error' });
        } finally {
            setHistoryLoading(false);
        }
    }

    function startScanner() {
        setScanning(true);
    }

    useEffect(() => {
        if (!scanning || !scannerRef.current) return;

        const scanner = new Html5QrcodeScanner(
            'qr-reader',
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            },
            false
        );

        scanner.render(
            (decodedText) => {
                scanner.clear().catch(() => {});
                setScanning(false);
                const parsed = parseQrCode(decodedText);
                if (!parsed) {
                    enqueueSnackbar('Invalid QR code format', { variant: 'error' });
                    return;
                }
                setScannedSession({ ...parsed, qrCode: decodedText });
                setAttendees([]);
                enqueueSnackbar('QR code scanned successfully!', { variant: 'success' });
            },
            (error) => {
                // ignore scan errors (camera scanning noise)
                void error;
            }
        );

        scannerInstanceRef.current = scanner;
        return () => {
            scanner.clear().catch(() => {});
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scanning]);

    function addAttendee(e) {
        e.preventDefault();
        if (!studentId.trim() || !studentName.trim()) {
            enqueueSnackbar('Student ID and Name are required', { variant: 'warning' });
            return;
        }
        if (attendees.find(a => a.studentId === studentId.trim())) {
            enqueueSnackbar('Student already added', { variant: 'warning' });
            return;
        }
        setAttendees(prev => [...prev, {
            studentId: studentId.trim(),
            name: studentName.trim(),
            email: studentEmail.trim(),
            markedAt: new Date().toISOString(),
        }]);
        setStudentId('');
        setStudentName('');
        setStudentEmail('');
    }

    function removeAttendee(id) {
        setAttendees(prev => prev.filter(a => a.studentId !== id));
    }

    async function submitAttendance() {
        if (!scannedSession) return;
        if (attendees.length === 0) {
            enqueueSnackbar('Add at least one student', { variant: 'warning' });
            return;
        }
        try {
            const res = await fetch('http://localhost:1337/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-access-token': token },
                body: JSON.stringify({ ...scannedSession, students: attendees }),
            });
            const data = await res.json();
            if (data.status === 'ok') {
                enqueueSnackbar('Attendance recorded successfully!', { variant: 'success' });
                setScannedSession(null);
                setAttendees([]);
            } else {
                enqueueSnackbar(data.error || 'Failed to record attendance', { variant: 'error' });
            }
        } catch {
            enqueueSnackbar('Server error', { variant: 'error' });
        }
    }

    if (!lecturer) return null;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header whichversion={'lecturer'} />

            <div className="flex-grow p-4 max-w-4xl mx-auto w-full">
                {/* Welcome bar */}
                <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center justify-between flex-wrap gap-2">
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">Welcome, {lecturer.name}</h1>
                        <p className="text-sm text-gray-500">{lecturer.department} · {lecturer.faculty}</p>
                    </div>
                    <button
                        onClick={() => navigate('/lecturer')}
                        className="text-sm text-green-600 hover:underline cursor-pointer"
                    >
                        ← Back to Profile
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                    {['scan', 'history'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition ${
                                activeTab === tab
                                    ? 'bg-green-600 text-white shadow'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {tab === 'scan' ? '📷 Scan QR' : '📋 Attendance History'}
                        </button>
                    ))}
                </div>

                {/* ── SCAN TAB ── */}
                {activeTab === 'scan' && (
                    <div className="space-y-4">
                        {/* Scanner card */}
                        {!scannedSession && (
                            <div className="bg-white rounded-xl shadow p-6 text-center">
                                <h2 className="text-base font-bold text-gray-700 mb-2">Scan Attendance QR Code</h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    Scan the QR code generated by the admin for the lecture session.
                                </p>
                                {!scanning ? (
                                    <button
                                        onClick={startScanner}
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg cursor-pointer transition"
                                    >
                                        Start Camera Scanner
                                    </button>
                                ) : (
                                    <div>
                                        <div id="qr-reader" ref={scannerRef} className="mx-auto max-w-sm" />
                                        <button
                                            onClick={() => {
                                                scannerInstanceRef.current?.clear().catch(() => {});
                                                setScanning(false);
                                            }}
                                            className="mt-3 text-sm text-red-500 hover:underline cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Session info + add students */}
                        {scannedSession && (
                            <div className="space-y-4">
                                {/* Session info */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <h3 className="font-bold text-green-800 mb-2">✅ Session Details</h3>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
                                        <span className="font-medium">Department:</span><span>{scannedSession.department}</span>
                                        <span className="font-medium">Academic Year:</span><span>{scannedSession.academicYear}</span>
                                        <span className="font-medium">Year:</span><span>{scannedSession.year}</span>
                                        <span className="font-medium">Semester:</span><span>{scannedSession.semester}</span>
                                        <span className="font-medium">Subject:</span><span className="col-span-1 truncate">{scannedSession.subject}</span>
                                    </div>
                                    <button
                                        onClick={() => { setScannedSession(null); setAttendees([]); }}
                                        className="mt-3 text-xs text-gray-400 hover:text-red-500 cursor-pointer transition"
                                    >
                                        ✕ Reset &amp; scan again
                                    </button>
                                </div>

                                {/* Add student form */}
                                <div className="bg-white rounded-xl shadow p-4">
                                    <h3 className="font-bold text-gray-700 mb-3">Mark Student Present</h3>
                                    <form onSubmit={addAttendee} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Student ID *"
                                            value={studentId}
                                            onChange={e => setStudentId(e.target.value)}
                                            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-green-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Student Name *"
                                            value={studentName}
                                            onChange={e => setStudentName(e.target.value)}
                                            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-green-500"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email (optional)"
                                            value={studentEmail}
                                            onChange={e => setStudentEmail(e.target.value)}
                                            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-green-500"
                                        />
                                        <button
                                            type="submit"
                                            className="sm:col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg cursor-pointer transition text-sm"
                                        >
                                            + Add Student
                                        </button>
                                    </form>
                                </div>

                                {/* Attendees list */}
                                {attendees.length > 0 && (
                                    <div className="bg-white rounded-xl shadow p-4">
                                        <h3 className="font-bold text-gray-700 mb-3">
                                            Present Students ({attendees.length})
                                        </h3>
                                        <div className="space-y-2 max-h-60 overflow-y-auto">
                                            {attendees.map((a, i) => (
                                                <div key={a.studentId} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm">
                                                    <span className="text-gray-500 w-6">{i + 1}.</span>
                                                    <span className="flex-1 font-medium text-gray-800">{a.name}</span>
                                                    <span className="text-gray-400 text-xs mr-4">{a.studentId}</span>
                                                    <button
                                                        onClick={() => removeAttendee(a.studentId)}
                                                        className="text-red-400 hover:text-red-600 cursor-pointer text-xs"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={submitAttendance}
                                            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg cursor-pointer transition"
                                        >
                                            Submit Attendance
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* ── HISTORY TAB ── */}
                {activeTab === 'history' && (
                    <div className="bg-white rounded-xl shadow p-4">
                        <h2 className="font-bold text-gray-700 mb-4">Your Attendance Sessions</h2>
                        {historyLoading ? (
                            <p className="text-gray-400 text-sm text-center py-8">Loading…</p>
                        ) : history.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-8">No attendance sessions recorded yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {history.map(record => (
                                    <div key={record._id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                                        <div className="flex items-start justify-between flex-wrap gap-2">
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{record.subject}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {record.department} · {record.year} · {record.semester} · {record.academicYear}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                                    {record.students?.length || 0} present
                                                </span>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(record.sessionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                        {record.students?.length > 0 && (
                                            <details className="mt-2">
                                                <summary className="text-xs text-blue-600 cursor-pointer hover:underline">View students</summary>
                                                <ul className="mt-2 space-y-1 pl-2">
                                                    {record.students.map((s, i) => (
                                                        <li key={s.studentId} className="text-xs text-gray-600">
                                                            {i + 1}. {s.name} — <span className="text-gray-400">{s.studentId}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default LecturerDashboard;
