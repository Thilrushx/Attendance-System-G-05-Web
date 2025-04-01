import React from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import DeleteConfirm from "./delete_confirm_modal";
import { useState } from "react";

const LecCard = ({ name, email, password, gender, image,id }) => {
  const [DeleteConfirmShowModal,setAboutUsShowModal] = useState(false);


  return (
    <>
    <div className="bg-white shadow-md w-55 rounded-lg overflow-hidden mx-auto font-sans mt-4">
    {/* Lecturer Image */}
    <div className="h-32 w-full">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>

    {/* Lecturer Details */}
    <div className="p-4 text-center">
      <h3 className="text-gray-800 text-lg font-bold">{name}</h3>
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button className="text-blue-600 cursor-pointer hover:text-blue-400">
          <FaEdit size={20} />
        </button>
        <button onClick={()=>{
          <DeleteConfirm email={email}/>
          setAboutUsShowModal(true)
          }} className="text-red-600 cursor-pointer hover:text-red-400">
          <FaTrash size={20} />
        </button>
        <button className="text-green-600 cursor-pointer hover:text-green-400">
          <FaPlus size={20} />
        </button>
      </div>
      {
                DeleteConfirmShowModal&&(
                    <DeleteConfirm name={name} email={email} id={id} onClose={()=>setAboutUsShowModal(false)}/>
                )
        }
    </div>
  </div>
    </>
  )
};
export default LecCard;
