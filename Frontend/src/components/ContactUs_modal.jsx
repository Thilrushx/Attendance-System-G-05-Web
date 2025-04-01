import React from 'react';
// import {PiBookOpenTextLight} from 'react-icons/pi';
// import {BiUserCircle} from 'react-icons/bi';
import {AiOutlineClose} from 'react-icons/ai';

const ContactUsModal = ({onClose}) => {
    return (
        <div className="fixed bg-black/60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
        onClick={onClose}
        >
            <div 
            onClick={(event)=>event.stopPropagation()}
            className='w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex-col relative'
            >
                <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                onClick={onClose}
                />
                    Contact Us
            </div>
            
        </div>
    );
};

export default ContactUsModal;