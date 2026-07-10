import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Lecturer = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [lecturer, setLecturer] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('lecturertoken');
        const info = localStorage.getItem('lecturerinfo');
        if (!token || !info) {
            localStorage.removeItem('lecturertoken');
            localStorage.removeItem('lecturerinfo');
            navigate('/lecturer_login');
            return;
        }
        setLecturer(JSON.parse(info));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function logout() {
        localStorage.removeItem('lecturertoken');
        localStorage.removeItem('lecturerinfo');
        enqueueSnackbar('Logged out successfully', { variant: 'info', autoHideDuration: 3000 });
        navigate('/');
    }

    if (!lecturer) return null;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header whichversion={'lecturer'} />

            <div className="flex-grow flex flex-col items-center justify-center p-6">
                <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full overflow-hidden">
                    {/* Profile image */}
                    <div className="h-40 bg-gradient-to-r from-green-600 to-green-400 flex items-end justify-center pb-0">
                        <img
                            src={lecturer.image || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'}
                            alt={lecturer.name}
                            className="w-24 h-24 rounded-full border-4 border-white object-cover translate-y-12 shadow-md"
                        />
                    </div>

                    <div className="pt-14 pb-6 px-6 text-center">
                        <h2 className="text-xl font-bold text-gray-800">{lecturer.name}</h2>
                        <p className="text-sm text-gray-500 mt-1">{lecturer.email}</p>
                        <div className="flex justify-center gap-3 mt-2 flex-wrap">
                            <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                                {lecturer.faculty || 'FOT'}
                            </span>
                            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                                {lecturer.department || 'ICT'}
                            </span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="border-t px-6 py-4 flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/lecturer/lecturer_dashboard')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition cursor-pointer"
                        >
                            Go to Dashboard
                        </button>
                        <button
                            onClick={logout}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg transition cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Lecturer;
