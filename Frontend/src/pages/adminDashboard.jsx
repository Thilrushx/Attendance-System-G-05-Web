import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [token, setToken] = useState('');
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter state
    const [filterDept, setFilterDept] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterSemester, setFilterSemester] = useState('');

    useEffect(() => {
        const t = localStorage.getItem('admintoken');
        if (!t) { navigate('/admin_Login'); return; }
        setToken(t);
        fetchRecords(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchRecords(t, params = {}) {
        setLoading(true);
        try {
            const query = new URLSearchParams();
            if (params.department) query.set('department', params.department);
            if (params.year) query.set('year', params.year);
            if (params.semester) query.set('semester', params.semester);

            const res = await fetch(`http://localhost:1337/api/attendance?${query.toString()}`, {
                headers: { 'x-access-token': t },
            });
            const data = await res.json();
            if (data.status === 'ok') setRecords(data.records);
            else enqueueSnackbar('Failed to load attendance', { variant: 'error' });
        } catch {
            enqueueSnackbar('Server error', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    }

    function applyFilters() {
        fetchRecords(token, {
            department: filterDept,
            year: filterYear,
            semester: filterSemester,
        });
    }

    function clearFilters() {
        setFilterDept('');
        setFilterYear('');
        setFilterSemester('');
        fetchRecords(token);
    }

    // Summary stats
    const totalSessions = records.length;
    const totalStudentAttendances = records.reduce((sum, r) => sum + (r.students?.length || 0), 0);
    const uniqueLecturers = [...new Set(records.map(r => r.lecturerEmail))].length;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header whichversion={'admin'} />

            <div className="flex-grow p-4 max-w-6xl mx-auto w-full">
                {/* Page header */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <h1 className="text-xl font-bold text-gray-800">Attendance Dashboard</h1>
                    <button
                        onClick={() => navigate('/admin')}
                        className="text-sm text-blue-600 hover:underline cursor-pointer"
                    >
                        ← Manage Lecturers
                    </button>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                        { label: 'Total Sessions', value: totalSessions, color: 'blue' },
                        { label: 'Student Attendances', value: totalStudentAttendances, color: 'green' },
                        { label: 'Active Lecturers', value: uniqueLecturers, color: 'purple' },
                    ].map(({ label, value, color }) => (
                        <div key={label} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center text-${color}-600 font-bold text-xl`}>
                                {value}
                            </div>
                            <p className="text-sm font-medium text-gray-600">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow p-4 mb-4">
                    <h2 className="text-sm font-bold text-gray-600 mb-3">Filter Records</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <input
                            type="text"
                            placeholder="Department (e.g. ICT)"
                            value={filterDept}
                            onChange={e => setFilterDept(e.target.value)}
                            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-400"
                        />
                        <select
                            value={filterYear}
                            onChange={e => setFilterYear(e.target.value)}
                            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white"
                        >
                            <option value="">All Years</option>
                            {['1stYear', '2ndYear', '3rdYear', '4thYear'].map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        <select
                            value={filterSemester}
                            onChange={e => setFilterSemester(e.target.value)}
                            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white"
                        >
                            <option value="">All Semesters</option>
                            <option value="1stSemester">1st Semester</option>
                            <option value="2ndSemester">2nd Semester</option>
                        </select>
                        <div className="flex gap-2">
                            <button
                                onClick={applyFilters}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm cursor-pointer transition"
                            >
                                Apply
                            </button>
                            <button
                                onClick={clearFilters}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 rounded-lg text-sm cursor-pointer transition"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Records table */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    {loading ? (
                        <p className="text-gray-400 text-sm text-center py-12">Loading attendance records…</p>
                    ) : records.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-12">No attendance records found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        {['Date', 'Lecturer', 'Subject', 'Dept', 'Year', 'Semester', 'Present'].map(h => (
                                            <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((r, i) => (
                                        <React.Fragment key={r._id}>
                                            <tr
                                                className="border-b hover:bg-gray-50 transition cursor-pointer"
                                                onClick={() => {
                                                    const el = document.getElementById(`detail-${r._id}`);
                                                    if (el) el.classList.toggle('hidden');
                                                }}
                                            >
                                                <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                    {new Date(r.sessionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </td>
                                                <td className="px-4 py-3 font-medium text-gray-800">{r.lecturerName}</td>
                                                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{r.subject}</td>
                                                <td className="px-4 py-3 text-gray-600">{r.department}</td>
                                                <td className="px-4 py-3 text-gray-600">{r.year}</td>
                                                <td className="px-4 py-3 text-gray-600">{r.semester}</td>
                                                <td className="px-4 py-3">
                                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                                        {r.students?.length || 0}
                                                    </span>
                                                </td>
                                            </tr>
                                            {/* Expandable student list */}
                                            <tr id={`detail-${r._id}`} className="hidden bg-gray-50">
                                                <td colSpan={7} className="px-6 py-3">
                                                    {r.students?.length > 0 ? (
                                                        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                                            {r.students.map((s, idx) => (
                                                                <li key={s.studentId} className="text-xs text-gray-600 bg-white border rounded px-2 py-1">
                                                                    <span className="font-medium">{idx + 1}. {s.name}</span>
                                                                    <br />
                                                                    <span className="text-gray-400">{s.studentId}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className="text-xs text-gray-400">No students recorded.</p>
                                                    )}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
