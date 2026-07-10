import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const AboutUsModal = ({ onClose }) => {
    return (
        <div
            className="fixed bg-black/60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-white rounded-2xl p-6 relative shadow-xl"
            >
                <AiOutlineClose
                    className="absolute right-5 top-5 text-2xl text-red-500 cursor-pointer hover:text-red-700 transition"
                    onClick={onClose}
                />

                <h2 className="text-2xl font-bold text-gray-800 mb-1">About Us</h2>
                <div className="w-10 h-1 bg-blue-600 rounded mb-4"></div>

                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    The <span className="font-semibold text-gray-800">Attendance System</span> is developed by
                    Group 05 of the Faculty of Technology, South Eastern University of Sri Lanka (SEUSL).
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    This system allows administrators to manage lecturers, generate QR codes for lecture sessions,
                    and track student attendance digitally — replacing traditional paper-based methods.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Lecturers can log in, scan session QR codes, and record student attendance in real time.
                    The admin dashboard provides a complete overview of all attendance sessions across departments,
                    years, and semesters.
                </p>

                <div className="mt-5 border-t pt-4">
                    <p className="text-xs text-gray-400 text-center">
                        © 2024 Group 05 · Faculty of Technology · SEUSL
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsModal;
