import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ContactUsModal = ({ onClose }) => {
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

                <h2 className="text-2xl font-bold text-gray-800 mb-1">Contact Us</h2>
                <div className="w-10 h-1 bg-green-600 rounded mb-4"></div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Have a question or issue? Reach out to the development team or your system administrator.
                </p>

                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <span className="text-lg">📧</span>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</p>
                            <p className="text-sm text-gray-700">attendance.support@seusl.ac.lk</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-lg">🏛️</span>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Institution</p>
                            <p className="text-sm text-gray-700">Faculty of Technology, SEUSL</p>
                            <p className="text-sm text-gray-500">Oluvil, Ampara, Sri Lanka</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-lg">📞</span>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</p>
                            <p className="text-sm text-gray-700">+94 67 225 5000</p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 border-t pt-4">
                    <p className="text-xs text-gray-400 text-center">
                        © 2024 Group 05 · Faculty of Technology · SEUSL
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactUsModal;
