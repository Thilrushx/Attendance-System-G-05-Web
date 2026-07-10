import React, { useEffect, useState } from 'react';
import AboutUsModal from '../components/AboutUs_modal';
import ContactUsModal from '../components/ContactUs_modal';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Navbar = ({ whichversion }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [showAboutUs, setShowAboutUs] = useState(false);
    const [showContactUs, setShowContactUs] = useState(false);
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (whichversion === 'admin') {
            const token = localStorage.getItem('admintoken');
            setUserStatus(!!token);
        } else if (whichversion === 'lecturer') {
            const token = localStorage.getItem('lecturertoken');
            const info = localStorage.getItem('lecturerinfo');
            setUserStatus(!!token);
            if (info) {
                const parsed = JSON.parse(info);
                setUserAvatar(parsed.image || null);
            }
        }
    }, [whichversion]);

    function logout() {
        if (whichversion === 'admin') {
            localStorage.removeItem('admintoken');
            enqueueSnackbar('Logged out successfully!', { variant: 'info', autoHideDuration: 3000 });
            navigate('/');
        } else if (whichversion === 'lecturer') {
            localStorage.removeItem('lecturertoken');
            localStorage.removeItem('lecturerinfo');
            enqueueSnackbar('Logged out successfully!', { variant: 'info', autoHideDuration: 3000 });
            navigate('/');
        }
    }

    function goHome() {
        localStorage.clear();
        navigate('/');
    }

    const adminLinks = (
        <>
            <a onClick={goHome} className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700">Home</a>
            <a onClick={() => navigate('/admin')} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Lecturers</a>
            <a onClick={() => navigate('/admin/attendance')} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Attendance</a>
            <a onClick={() => navigate('/admin/admin_dashboard')} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">QR Generator</a>
            <a onClick={() => setShowAboutUs(true)} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About Us</a>
            <a onClick={() => setShowContactUs(true)} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contact Us</a>
        </>
    );

    const lecturerLinks = (
        <>
            <a onClick={goHome} className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700">Home</a>
            <a onClick={() => navigate('/lecturer')} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Profile</a>
            <a onClick={() => navigate('/lecturer/lecturer_dashboard')} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</a>
            <a onClick={() => setShowAboutUs(true)} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About Us</a>
            <a onClick={() => setShowContactUs(true)} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contact Us</a>
        </>
    );

    const publicLinks = (
        <>
            <a onClick={() => navigate('/')} className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700">Home</a>
            <a onClick={() => setShowAboutUs(true)} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About Us</a>
            <a onClick={() => setShowContactUs(true)} className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contact Us</a>
        </>
    );

    const navLinks = whichversion === 'admin' ? adminLinks : whichversion === 'lecturer' ? lecturerLinks : publicLinks;

    // Mobile equivalents (block instead of inline)
    const mobileAdminLinks = (
        <>
            <a onClick={goHome} className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700">Home</a>
            <a onClick={() => navigate('/admin')} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Lecturers</a>
            <a onClick={() => navigate('/admin/attendance')} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Attendance</a>
            <a onClick={() => navigate('/admin/admin_dashboard')} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">QR Generator</a>
            <a onClick={() => { setShowAboutUs(true); setIsMenuOpen(false); }} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About Us</a>
            <a onClick={() => { setShowContactUs(true); setIsMenuOpen(false); }} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contact Us</a>
        </>
    );

    const mobileLecturerLinks = (
        <>
            <a onClick={goHome} className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700">Home</a>
            <a onClick={() => navigate('/lecturer')} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Profile</a>
            <a onClick={() => navigate('/lecturer/lecturer_dashboard')} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</a>
            <a onClick={() => { setShowAboutUs(true); setIsMenuOpen(false); }} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About Us</a>
            <a onClick={() => { setShowContactUs(true); setIsMenuOpen(false); }} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contact Us</a>
        </>
    );

    const mobilePublicLinks = (
        <>
            <a onClick={() => navigate('/')} className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700">Home</a>
            <a onClick={() => { setShowAboutUs(true); setIsMenuOpen(false); }} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About Us</a>
            <a onClick={() => { setShowContactUs(true); setIsMenuOpen(false); }} className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contact Us</a>
        </>
    );

    const mobileLinks = whichversion === 'admin' ? mobileAdminLinks : whichversion === 'lecturer' ? mobileLecturerLinks : mobilePublicLinks;

    const avatarSrc = userAvatar
        || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        {/* Mobile menu button */}
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                                aria-label="Toggle navigation menu"
                            >
                                {isMenuOpen ? (
                                    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Logo + nav links */}
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img className="h-10 w-auto" src="../src/assets/icon.png" alt="Attendance System" />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-1">
                                    {navLinks}
                                </div>
                            </div>
                        </div>

                        {/* Right side: user dropdown or nothing */}
                        {userStatus && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <div className="relative ml-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="relative cursor-pointer flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        aria-expanded={isUserDropdownOpen}
                                        aria-haspopup="true"
                                        aria-label="User menu"
                                    >
                                        <img
                                            className="size-8 rounded-full object-cover"
                                            src={avatarSrc}
                                            alt="User avatar"
                                        />
                                    </button>

                                    {isUserDropdownOpen && (
                                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5">
                                            <a
                                                href="#"
                                                onClick={(e) => { e.preventDefault(); logout(); }}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Sign out
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="sm:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {mobileLinks}
                            {userStatus && (
                                <a
                                    onClick={logout}
                                    className="cursor-pointer block rounded-md px-3 py-2 text-base font-medium text-red-300 hover:bg-gray-700 hover:text-red-200"
                                >
                                    Sign out
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {showAboutUs && <AboutUsModal onClose={() => setShowAboutUs(false)} />}
            {showContactUs && <ContactUsModal onClose={() => setShowContactUs(false)} />}
        </div>
    );
};

export default Navbar;
