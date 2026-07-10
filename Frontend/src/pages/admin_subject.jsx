import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { useRef, useState, useEffect } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';
import QRCode from "react-qr-code";
import Countdown from "react-countdown";



const durationOptions  = ['1 Minute' , '5 Minutes' , '15 Minutes' , '30 Minutes' ];
const departmentOptions = ["ICT"];
const AcademicYearOptions = ["2015/2016", "2016/2017" , "2017/2018" , "2018/2019" , "2019/2020" , "2020/2020" ,"2021/2022 ","2022/2023"];
const YearOptions = ["1st Year" ,"2nd Year","3rd Year","4th Year"];
const SemesterOptions = ["1st Semester","2nd Semester"];
let SubjectOptions = [];
const firstYear_sem_01_subjects = [
    'CIS 11011 - Essential of ICT and PC Application',
    'CIS 11022 - Database Design',
    'CIS 11032 - Logic Designing and Computer Organization',
    'CIS 11042 - Practical for Essential of ICT and PC Application',
    'CIS 11051 - Practical for Database Design',
    'CIS 11013 - Mathematics for ICT',
    'CMS 11022 - English I',
    'CMS 11031 - Tamil Language (for Sinhala Speaking Students',
    'SWT 11012 - Fundemental of Programming',
    'SWT 11022 - Practical for Fundemental of Programming',
];
const firstYear_sem_02_subjects = [
    'CIS 12012 - Social Computing',
    'CMS 12012 - Statistics',
    'CMS 12022 -  English II',
    'CMS 12031 - Practical for Statistics',
    'MGT 12012 - Multimedia and Graphic Design',
    'MGT 12021 - Practical for Multimedia and Graphic Design',
    'NST 12012 - Computer Networks',
    'SWT 12012 - Object Oriented Programming',
    'SWT 12022 - Web Systems and Technologies',
    'SWT 12031 - Practical for Object Oriented Programming',
    'SWT 12041 - Practical for Web Systems & Technologies'
];
const secondYear_sem_01_subjects = [
    'CIS 21012 - Platform Technologies',
    'CIS 21022 - Social and Professional Issues in ICT',
    'CIS 21031 - Practical for Platform Technologies',
    'NST 21012 - Network Switching and Routing',
    'NST 21022 - Practical for Network Switching and Routing',
    'SWT 21012 - Data Structures and Algorithms',
    'SWT 21022 - Object Oriented Analysis and Design',
    'SWT 21032 - Practical for Data Structures and Algorithms',
    'UCT 21011 - Digital Electronic Systems',
    'UCT 21022 - Practical for Digital Electronic Systems',
];
const secondYear_sem_02_subjects = [
    'CIS 22012 - Distributed and Cloud Computing',
    'CIS 22022 - Information Assurance and Forensics',
    'CIS 22032 - E-commerce Strategis and Architecture',
    'CIS 22042 - Practical for Distributed and Cloud Computing',
    'CMS 22012 - Leadership & Communication Skills',
    'SWT 22022 - Practical for Internet Application Development',
    'SWT 22012 - Internet Application Development',
    'UCT 22011 - Microcontroller System Programming',
    'UCT 22022 - Practical for Microcontroller System Programming'
];
const thirdYear_sem_01_subjects = [
    'CMS 31022 - Research Methodologies for ICT',
    'SWT 31012 - Software Engineering ',
    'SWT 31022 - Software Verification and Quality Assurance',
    'CIS 31012 - ICT Project Management',
    'CIS 31022 - Data Mining',
    'CIS 31041 - Practical for Data Mining',
    'CIS 31032 - Human Computer Interaction',
    'CIS 31051 - Practical for Human Computer Interaction',
    'NST 31022 - Cryptography',
    'UCT 31012 - Artificial Intelligence ',
    'UCT 31021 - Practical for Artificial Intelligence',
    'NST 31051 - Practical for Cryptography',
    'NST 31011 - Scaling and Connecting Network',
    'NST 31042 - Practical for Scaling and Connecting Network',
    'NST 31032 - Vulnerability Assessment and Penetration Testing-I',
    'NST 31062 - Practical for Vulnerability Assessment and Penetration Testing-I'
];
const thirdYear_sem_02_subjects = [
   'thirYear_sem_02_subject01',
   'thirYear_sem_02_subject02',
   'thirYear_sem_02_subject03',
   'thirYear_sem_02_subject04',
   'thirYear_sem_02_subject05',
   'thirYear_sem_02_subject06',
   'thirYear_sem_02_subject07',
   'thirYear_sem_02_subject08',
];
const forthYear_sem_01_subjects = [
    'forthYear_sem_01_subject01',
    'forthYear_sem_01_subject02',
    'forthYear_sem_01_subject03',
    'forthYear_sem_01_subject04',
    'forthYear_sem_01_subject05',
    'forthYear_sem_01_subject06',
    'forthYear_sem_01_subject07',
    'forthYear_sem_01_subject08',
    'forthYear_sem_01_subject09',
    'forthYear_sem_01_subject10',
    'forthYear_sem_01_subject11'
 ];




const admin_subject = () => {
    const [QRtext, setQRtext] = useState("");

    const [ClockDuration, setClockDuration] = useState(0);

    const subjectDropdownRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState("down");

    const [isOpenDep, setIsOpenDep] = useState(false);
    const [isOpenAc_Year, setisOpenAc_Year] = useState(false);
    const [isOpenYear, setisOpenYear] = useState(false);
    const [isOpenSemester, setisOpenSemester] = useState(false);
    const [isOpenSubject, setisOpenSubject] = useState(false);
    const [isOpenDuration, setisOpenDuration] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const [isHiddenCreateQrButton, setIsHiddenCreateQrButton] = useState(false);

    const [selectedYear, setselectedselectedYear] = useState("Select a Year");
    const [selectedDepartment, setselectedDepartment] = useState("Select a Department");
    const [selectedAcademicYear, setselectedAcademicYear] = useState("Select a Academic Year");
    const [selectedSubject, setselectedselectedSubject] = useState("Select a Subject");
    const [selectedSemester, setselectedselectedSemester] = useState("Select a Semester");
    const [selectedDuration, setselectedselectedDuartion] = useState("Set a Duration");


    const { enqueueSnackbar } = useSnackbar();
    
    const toggleDropdownDuration = () => setisOpenDuration(!isOpenDuration);
    const toggleDropdownDepartment = () => setIsOpenDep(!isOpenDep);
    const toggleDropdownAc_Year = () => setisOpenAc_Year(!isOpenAc_Year);
    const toggleDropdownYear = () => setisOpenYear(!isOpenYear);
    const toggleDropdownSemester = () => setisOpenSemester(!isOpenSemester);
    const toggleDropdownSubject = () => {
        if (
            [selectedDepartment, selectedAcademicYear, selectedSemester].every(
                (item) =>
                    item !== "Select a Department" &&
                    item !== "Select a Academic Year" &&
                    item !== "Select a Semester"
            )
        ) {
            if (selectedDepartment === "ICT") {
                if (selectedYear === "1st Year" && selectedSemester === "1st Semester") {
                    SubjectOptions = firstYear_sem_01_subjects.map((item) => item);
                    setisOpenSubject(!isOpenSubject);
                }else if(selectedYear === "1st Year" && selectedSemester === "2nd Semester"){
                    SubjectOptions = firstYear_sem_02_subjects.map((item) => item);
                    setisOpenSubject(!isOpenSubject);
                }
                else if(selectedYear === "2nd Year" && selectedSemester === "1st Semester"){
                    SubjectOptions = secondYear_sem_01_subjects.map((item) => item);
                    setisOpenSubject(!isOpenSubject);
                }
                else if(selectedYear === "2nd Year" && selectedSemester === "2nd Semester"){
                    SubjectOptions = secondYear_sem_02_subjects.map((item) => item);
                    setisOpenSubject(!isOpenSubject);
                }
                else if(selectedYear === "3rd Year" && selectedSemester === "1st Semester"){
                    SubjectOptions = thirdYear_sem_01_subjects.map((item) => item);
                    setisOpenSubject(!isOpenSubject);
                }
                else if(selectedYear === "3rd Year" && selectedSemester === "2nd Semester"){
                    SubjectOptions = thirdYear_sem_02_subjects.map((item) => item);
                    setisOpenSubject(!isOpenSubject);
                }
                else if(selectedYear === "4th Year" && selectedSemester === "1st Semester"){
                    SubjectOptions = thirdYear_sem_02_subjects.map((item) => item);
                    setisOpenSubject(!isOpenSubject);
                }else if(selectedYear === "4th Year" && selectedSemester === "2nd Semester"){
                    SubjectOptions = ['']
                    setselectedselectedSubject('Select a Semester');
                }
            }
        }else{
            enqueueSnackbar('Select Previous All Options',{variant: 'error'});
        }
    
    };

    const QrCodeGenerate = () => {
        if (
            [selectedDepartment, selectedAcademicYear, selectedYear ,selectedSemester, selectedSubject,selectedDuration].every(
                (item) =>
                    item !== "Select a Department" &&
                    item !== "Select a Academic Year" &&
                    item !== "Select a Year" &&
                    item !== "Select a Semester" &&
                    item !== "Select a Subject" &&
                    item !== "Set a Duration"
            )
        ) {
            setIsHiddenCreateQrButton(true)
            let text = selectedDepartment;
            text = text.concat("_",selectedAcademicYear);
            text = text.concat("_");
            selectedYear.split("").map((char,index)=>{
                if(char===" "){
                
                }else{
                    text=text.concat(char)
                }
            });
            text = text.concat("_");
            selectedSemester.split("").map((char,index)=>{
                if(char===" "){
                
                }else{
                    text=text.concat(char)
                }
            });
            text = text.concat("_");
            selectedSubject.split("").forEach((char, index) => {
                if (index < 9 && char !== " ") {
                    if(char===" "){
                
                    }else{
                        text=text.concat(char)
                    }
                }
            });
            if(selectedDuration==='1 Minute'){
                setClockDuration(60000);
            }else if(selectedDuration==='5 Minutes'){
                setClockDuration(300000);
            }else if(selectedDuration==='15 Minutes'){
                setClockDuration(900000);
            }else if(selectedDuration==='30 Minutes'){
                setClockDuration(1800000);
            }
            setQRtext(text);
            
            console.log(text);
        }else{
            enqueueSnackbar('Select All Options Before Generate',{variant: 'error'});
        }
    }

    
    const handleSelectDepartment = (option) => { 
        setselectedDepartment(option);
        setIsOpenDep(false);
      };
    const handleSelectAc_Year = (option) => { 
        setselectedAcademicYear(option);
        setisOpenAc_Year(false);
    };
    const handleSelectYear = (option) => { 
        setselectedselectedYear(option);
        setisOpenYear(false);
    };
    const handleSelectSemester = (option) => { 
        setselectedselectedSemester(option);
        setisOpenSemester(false);
    };
    const handleSelectSubject = (option) => { 
        setselectedselectedSubject(option);
        setisOpenSubject(false);
    };
    const handleSelectDuration = (option) => { 
        setselectedselectedDuartion(option);
        setisOpenDuration(false);
    };

    const resetall = () => {
        setIsBlurred(false);
        setIsHiddenCreateQrButton(false);
        setselectedselectedYear("Select a Year");
        setselectedDepartment("Select a Department");
        setselectedAcademicYear("Select a Academic Year");
        setselectedselectedSubject("Select a Subject");
        setselectedselectedSemester("Select a Semester");
        setselectedselectedDuartion("Set a Duration");
        setQRtext('');
    }

    useEffect(() => {
        if (isOpenSubject && subjectDropdownRef.current) {
            const rect = subjectDropdownRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const spaceBelow = windowHeight - rect.bottom;
    
            if (spaceBelow < 200) {
                setDropdownPosition("up"); // Show dropdown above
            } else {
                setDropdownPosition("down"); 
            }
        }
    }, [isOpenSubject])
    
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            setIsBlurred(true);
            // setIsHiddenCreateQrButton(false);
          return <span className='text-b'>Time's up! ⏳</span>;
        } else {
          return (
            <div className="text-2xl font-bold">
              {minutes}:{seconds}
            </div>
          );
        }
    };


    return (
        <div class="flex flex-col min-h-screen">
            <Header whichversion={'admin'} />
            <div className="flex-grow flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 min-h- items-center justify-center">
            <div className="grid grid-rows-5 gap-y-9"> 
  {/* department select */}
  <div className="relative inline-block text-left w-70">
    <button onClick={toggleDropdownDepartment} className="bg-blue-600  hover:bg-blue-400 cursor-pointer text-white px-4 py-2 rounded-xl focus:outline-none flex items-center justify-between w-full">
      {selectedDepartment}
      <span className={`ml-2 transform transition-transform ${isOpenDep ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
    </button>
    {isOpenDep && (
      <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10"> {/* Adjusted margin */}
        <ul className="py-1">
          {departmentOptions.map((option, index) => {
              return (
                  <li key={index} onClick={() => handleSelectDepartment(option)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {option}
                  </li>
              );
          })}
        </ul>
      </div>
    )}
  </div>

  {/* Academic Year select */}
  <div className="relative inline-block text-left w-70">
    <button onClick={toggleDropdownAc_Year} className="bg-blue-600 text-white  hover:bg-blue-400 cursor-pointer px-4 py-2 rounded-xl focus:outline-none flex items-center justify-between w-full">
      {selectedAcademicYear}
      <span className={`ml-2 transform transition-transform ${isOpenAc_Year ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
    </button>
    {isOpenAc_Year && (
      <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
        <ul className="py-1">
          {AcademicYearOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectAc_Year(option)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  {/* Year select */}
  <div className="relative inline-block text-left w-48">
    <button onClick={toggleDropdownYear} className="bg-blue-600  hover:bg-blue-400 cursor-pointer text-white px-4 py-2 rounded-xl focus:outline-none flex items-center justify-between w-full">
      {selectedYear}
      <span className={`ml-2 transform transition-transform ${isOpenYear ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
    </button>
    {isOpenYear && (
      <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
        <ul className="py-1">
          {YearOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectYear(option)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>

  {/* Semester select */}
  <div className="relative inline-block text-left w-48">
    <button onClick={toggleDropdownSemester} className="bg-blue-600 text-white  hover:bg-blue-400 cursor-pointer  px-4 py-2 rounded-xl focus:outline-none flex items-center justify-between w-full">
      {selectedSemester}
      <span className={`ml-2 transform transition-transform ${isOpenSemester ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
    </button>
    {isOpenSemester && (
      <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
        <ul className="py-1">
          {SemesterOptions.map((option, index) => {
              return (
                  <li key={index} onClick={() => handleSelectSemester(option)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {option}
                  </li>
              );
          })}
        </ul>
      </div>
    )}
  </div>

   {/* Subject select */}
   <div className="relative inline-block text-left w-120">
        <button
            ref={subjectDropdownRef}
            onClick={toggleDropdownSubject}
            className="bg-blue-600 text-white cursor-pointer hover:bg-blue-400 cursor-pointer  px-4 py-2 rounded-xl focus:outline-none flex items-center justify-between w-full"
        >
            {selectedSubject}
            <span
                className={`ml-2 transform transition-transform ${
                    isOpenSubject ? "rotate-180" : "rotate-0"
                }`}
            >
                &#9662;
            </span>
        </button>
        {isOpenSubject && (
    <div
        className={`absolute ${
            dropdownPosition === "up" ? "bottom-full mb-1" : "mt-1"
        } w-full bg-white border rounded-md shadow-lg z-10`}
        style={{ maxHeight: "200px", overflowY: "auto" }} // Add scrolling
    >
        <ul className="py-1">
            {SubjectOptions.map((option, index) => (
                <li
                    key={index}
                    onClick={() => handleSelectSubject(option)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                    {option}
                </li>
            ))}
        </ul>
    </div>
)}

    </div>
</div>
    <div className="grid grid-rows-2 gap-9 items-center justify-center"> 
          {/* Duration select */}
  <div className="relative inline-block text-left w-40">
    <button onClick={toggleDropdownDuration} className="bg-pink-500  hover:bg-pink-400 cursor-pointer  text-white px-4 py-2 rounded-md focus:outline-none flex items-center justify-between w-full">
      {selectedDuration}
      <span className={`ml-2 transform transition-transform ${isOpenDuration ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
    </button>
    {isOpenDuration && (
      <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
        <ul className="py-1">
          {durationOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectDuration(option)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              {option}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
    {
        !isHiddenCreateQrButton && (
            <button type="button" onClick={QrCodeGenerate}
        class="px-5 py-2.5 w-20-auto h-10 cursor-pointer rounded-full text-white text-sm tracking-wider font-medium border border-current outline-none bg-green-500 hover:bg-green-200 active:bg-blue-700 ">Create QR</button>
        )
    }

    <button type="button"  onClick={resetall}
        class="px-5 py-2.5 w-20-auto h-10 rounded-full cursor-pointer text-white text-sm tracking-wider font-medium border border-current outline-none bg-red-700 hover:bg-red-400 active:bg-blue-700">Reset all</button>
        
    </div>


      {/* Right Column QrCode */}
      <div className="bg-gray-200 p-7 flex items-center justify-center rounded-md ">
      <div className="flex flex-col items-center p-4">
      <h2 className="text-lg font-bold mb-2">QR Code</h2>
      {QRtext && (
        <div className='qr-con' style={{filter: isBlurred ? "blur(5px)" : "none"}}>
             <QRCode value={QRtext} size={200} className={`p-2 bg-white shadow-md`} />
        </div>
      )}
      {
        QRtext && (
            <div className='p-3'>
                   <Countdown 
      date={Date.now() + ClockDuration} 
      renderer={renderer}
    />
            </div>
        )
      }
    </div>
      </div>
    </div>
            </div>
            <Footer />
        </div>
    );
};

export default admin_subject;