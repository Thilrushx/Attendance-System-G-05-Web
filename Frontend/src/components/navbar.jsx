import React, { useEffect } from 'react';
import { useState } from 'react'
import AboutUsModal from '../components/AboutUs_modal'
import ConatctUsModal from '../components/ContactUs_modal'
import { useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from 'notistack';

const navbar = ({whichversion}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [AboutUsShowModal,setAboutUsShowModal] = useState(false);
  const [ContactUsShowModal,setContactUsShowModal] = useState(false)
  const navigate = useNavigate();
  const [UserStatus,setUserStatus] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    const token = localStorage.getItem('admintoken')
    if(token){
      setUserStatus(true)
    }
  });

  async function logout(){
    if(whichversion==='admin'){
      localStorage.removeItem('admintoken');
      enqueueSnackbar("Logged out successfully!", { variant: "info", autoHideDuration: 3000 });
      navigate('/');
    }else if(whichversion==='lecturer'){

    }
  }

  async function logoutany(){
    localStorage.clear();
    navigate('/')
  }

    return (
        <div>
            {UserStatus?(
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
            
                      {/* Navigation Links */}
                      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                          <img className="h-10 w-auto" src="../src/assets/icon.png" alt="AttendanceSystem" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                          <div className="flex space-x-4">
                            <a  onClick={logoutany} className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white  hover:bg-gray-700 hover:text-white">Home</a>
                            <a  onClick={()=>setAboutUsShowModal(true)} className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white  hover:bg-gray-700 hover:text-white">About Us</a>
                            <a  onClick={()=>setContactUsShowModal(true)} className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white  hover:bg-gray-700 hover:text-white">Contact Us</a>
                          </div>
                        </div>
                      </div>
                          
                      {/* User Profile Dropdown */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* User Menu */}
                        <div className="relative ml-3">
                          <button
                            type="button"
                            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                            className="relative cursor-pointer flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            id="user-menu-button"
                            aria-expanded={isUserDropdownOpen}
                            aria-haspopup="true"
                          >
                            <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                          </button>
            
                          {/* Dropdown menu */}
                          {isUserDropdownOpen && (
                            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5">
                              {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                              <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a> */}
                              <a href="#" onClick={logout} className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
            
                  {/* Mobile Menu (Hidden by Default) */}
                  {isMenuOpen && (
                    <div className="sm:hidden" id="mobile-menu">
                      <div className="space-y-1 px-2 pt-2 pb-3">
                        <a onClick={()=>navigate('/')}  className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">Home</a>
                        <a onClick={()=>setAboutUsShowModal(true)}  className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">About Us</a>
                        <a onClick={()=>setContactUsShowModal(true)} className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">Contact Us</a>
                      </div>
                    </div>
                  )}
                </nav>
            ):(
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

          {/* Navigation Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img className="h-10 w-auto" src="../src/assets/icon.png" alt="AttendanceSystem" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
              <a onClick={() => navigate('/')} className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white  hover:bg-gray-700 hover:text-white">Home</a>  
              <a onClick={()=>setAboutUsShowModal(true)}  className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white  hover:bg-gray-700 hover:text-white">About Us</a>
              <a onClick={()=>setContactUsShowModal(true)}  className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white  hover:bg-gray-700 hover:text-whitee">Contact Us</a>
              </div>
            </div>
          </div>

          {/* Log in Button */}
          {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a href="#" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
              Log in
            </a>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu (Hidden by Default) */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <a  onClick={()=>navigate('/')}   className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">Home</a>
            <a  onClick={()=>setAboutUsShowModal(true)} className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">About Us</a>
            <a  onClick={()=>setContactUsShowModal(true)} className="cursor-pointer block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white">Contact</a>
           </div>
        </div>
      )}
    </nav>
            )}
        {
                AboutUsShowModal&&(
                    <AboutUsModal onClose={()=>setAboutUsShowModal(false)}/>
                )
        }
         {
                ContactUsShowModal&&(
                    <ConatctUsModal onClose={()=>setContactUsShowModal(false)}/>
                )
        }
        </div>
        
     
    );
};

export default navbar;