import React, { useEffect, useState } from 'react'; 
import Header from '../components/header';
import Footer from '../components/footer';
import LecCard from '../components/lec_card';
import { useNavigate } from 'react-router-dom'
import { SnackbarProvider, useSnackbar } from 'notistack';


const departmentOptions = ["ICT"];
const facultyOptions = ["FOT"];

const Admin = () => {

    const navigate = useNavigate();
    const [error,seterror] = useState('');
    const [name,setname] =useState('');
    const [password,setpassword] =useState('');
    const [confirmpassword,setconfirmpassword] =useState('');
    const [email,setemail] =useState('');
    const [gender,setgender] =useState('');
    const [image,setimage] =useState('https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    const [isLecAddFormShow, setisLecAddFormShow] = useState(true);
    const [ischeckedmale,setischeckedmale]  = useState(false);
    const [ischeckedfemale,setischeckedfemale]  = useState(false);
    const [isOpenDep,setisOpenDep] = useState(false);
    const [selectedDepartment,setselectedDepartment]  = useState('Select a Department');
    const [isOpenFaculty,setisOpenFaculty] = useState(false);
    const [selectedFaculty,setselectedFaculty]  = useState('Select a Faculty');
    const { enqueueSnackbar } = useSnackbar();
    
    const [lecturerData,setlecturerData] = useState([]);

    async function AddLecturers (event){
        event.preventDefault()
        const response = await fetch('http://localhost:1337/lectureadd',
          {
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              name,
              email,
              password,
              selectedDepartment,
              selectedFaculty,
              gender,
              image
            })
          });
          const data = await response.json()
          
          if(data.status==='ok'){
            navigate('/admin')
          }
      }

    const showForm = () => {
        seterror('')
        setisLecAddFormShow(!isLecAddFormShow);
    }

    const malecheck = () => {
        setischeckedmale(true);
        setgender('male')
        setischeckedfemale(false);
    }

    const femalecheck = () => {
        setischeckedmale(false);
        setgender('female')
        setischeckedfemale(true);
    }

    const handleSelectDepartment = (option) => { 
        setselectedDepartment(option);
        setisOpenDep(false);
    };

    const handleSelectFaculty = (option) => { 
        setselectedFaculty(option);
        setisOpenFaculty(false);
    };
    
    const toggleDropDownDepartment = (event) => {
        event.preventDefault();
        setisOpenDep(!isOpenDep);
    } 

    const toggleDropDownFaculty = (event) => {
        event.preventDefault();
        setisOpenFaculty(!isOpenFaculty);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(password==='' && confirmpassword==='' && selectedDepartment==='Select a Department' &&  selectedFaculty==='Select a Faculty' && name==='' && email===''){
            enqueueSnackbar("All feild need filled!", { 
                variant: "error", 
                autoHideDuration: 3000 
            });
        }
        else{
            if (password !== confirmpassword) {
                enqueueSnackbar("Passwords do not match!", { 
                    variant: "error", 
                    autoHideDuration: 3000 
                });
            }
            else{
                console.log(gender);
                console.log(selectedDepartment);
                console.log(selectedFaculty);
                console.log(name);
                console.log(email);
                console.log(password);
                
                const response = await fetch('http://localhost:1337/lectureadd',
                    {
                      method: 'POST',
                      headers:{
                        'Content-Type':'application/json'
                      },
                      body: JSON.stringify({
                        name,
                        email,
                        password,
                        selectedDepartment,
                        selectedFaculty,
                        gender,
                        image
                      })
                    });
                    const data = await response.json()
                    
                    if(data.status==='ok'){
                        setisLecAddFormShow(!isLecAddFormShow);
                      navigate('/admin')
                    }
            }
        }
    };

    async function populateLec () {
        const req = await fetch('http://localhost:1337/api/lectures',{
            headers:{
                'x-access-token': localStorage.getItem('admintoken')
            }
        })
        const data = await req.json();
        if(data.status==='ok'){
            setlecturerData(data.lec_data)
        }else{
            alert(data.error)
        }
    }

    useEffect(()=>{
        const admintoken = localStorage.getItem('admintoken')
        if(!admintoken){
            localStorage.removeItem('admintoken')
            navigate('/');
        }else{
            populateLec()
        }
    })

    return (
        <div className="flex flex-col min-h-screen">
            <Header whichversion={'admin'} />

            {/* Main Content */}
            <div className="flex-grow flex flex-col">
                {/* Button Section */}
                <div className="relative w-full h-auto p-4">
                    <button className="absolute cursor-pointer top-0 right-0 m-4 bg-blue-600 p-2 rounded-xl hover:bg-blue-500 text-white px-4 py-2 focus:outline-none" onClick={showForm}>
                        Add Lecturer
                    </button>
                </div>

                {/* Scrollable Card Section */}
                {
                    isLecAddFormShow?(
                <div className="flex-grow overflow-y-auto p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {lecturerData.length === 0 ? (
                            <p className="text-gray-600 text-center col-span-full">No lecturers added yet.</p>
                    ) : (
                        lecturerData.map((lecturer) => (
                            <div key={lecturer._id} className="rounded-lg p-6 h-auto">
                        <LecCard 
                            id={lecturer._id} 
                            name={lecturer.name} 
                            image={lecturer.image} 
                            email={lecturer.email} 
                            password={lecturer.password} 
                            gender={lecturer.gender} 
                        />
                    </div>
                ))
    )}
</div>

                </div>
            
                    ):(
                        <form class="font-[sans-serif] text-[#333] mt-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full p-5 min-h- items-center justify-center">
        
                           <div className="relative inline-block text-left">
                                <div className="grid grid-rows-3 gap-y-20">
                                    <div>
                                        <input type="text" onChange={(e)=>setname(e.target.value)}placeholder="Enter Name"
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all" />
                                    </div>
                                    <div>
                                        <input type="email" onChange={(e)=>setemail(e.target.value)}   placeholder="Enter Email"
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all" />
                                    </div>
                                    <div>
                                        <input type="file" class="w-full text-slate-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
                                    </div>
                                </div>    
                            </div>
                            <div className="relativ inline-block text-left">
                                <div className="grid grid-rows-3 gap-y-20 ">
                                    <div>
                                        <input type="password" onChange={(e)=>setpassword(e.target.value)} placeholder="Enter Password" 
                                        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all" />
                                    </div>
                                    <div>
                                        <input type="password" onChange={(e)=>setconfirmpassword(e.target.value)} placeholder="Enter Confirm Password" 
                                         className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm transition-all"/>
                                    </div>
                                    <div>
                                        <div className="relative inline-block text-left w-full">
                                            <button onClick={toggleDropDownFaculty} className="bg-blue-600 text-white  hover:bg-blue-400 cursor-pointer px-4 py-2 rounded-xl focus:outline-none flex items-center justify-between w-full">
                                                {selectedFaculty}
                                            <span className={`ml-2 transform transition-transform ${isOpenFaculty ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
                                            </button>
                                            {isOpenFaculty && (
                                                <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
                                                    <ul className="py-1">
                                                        {facultyOptions.map((option, index) => (
                                                        <li key={index} onClick={() => handleSelectFaculty(option)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                        {option}
                                                    </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            <div className="relativ inline-block text-left">
                                <div className="grid grid-rows-3 gap-y-20 ">
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-x-20 w-full p-2 min-h- items-center justify-center"> 
                                        <div className="relative inline-block text-left">
                                            <input type="radio" class="w-5 h-5"  onClick={malecheck} checked={ischeckedmale}/>
                                            <label class="text-sm text-black ml-4">Male</label>
                                        </div>
                                        <div>
                                            <input type="radio" class="w-5 h-5"  onClick={femalecheck} checked={ischeckedfemale}/>
                                            <label class="text-sm text-black ml-4">Female</label>
                                        </div>
                                </div>
                                <div className="relative inline-block text-left w-full">
                                    <button onClick={toggleDropDownDepartment} className="bg-blue-600 text-white  hover:bg-blue-400 cursor-pointer px-4 py-2 rounded-xl focus:outline-none flex items-center justify-between w-full">
                                        {selectedDepartment}
                                    <span className={`ml-2 transform transition-transform ${isOpenDep ? "rotate-180" : "rotate-0"}`}>&#9662;</span>
                                    </button>
                                    {isOpenDep && (
                                        <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
                                            <ul className="py-1">
                                            {departmentOptions.map((option, index) => (
                                            <li key={index} onClick={() => handleSelectDepartment(option)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                {option}
                                            </li>
                                            ))}
                                        </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="relative inline-block text-left w-full items-center">
                                <input type='submit' className="w-full h-full px-6 cursor-pointer py-2.5 text-sm bg-[#e40e0e] hover:bg-[#ce6b6b] text-white rounded-3xl" />

                                </div>
                                </div>
                            </div>
                            </div>
                        </form>
                    )
                }
                
            </div>

            {/* Footer Stays at Bottom */}
            <Footer />
        </div>
    );
};

export default Admin;

