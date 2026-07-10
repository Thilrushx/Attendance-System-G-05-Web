import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

const DeleteConfirmModal = ({ email, onClose,name, id}) => {

    // const {id} =  useParams();
    const { enqueueSnackbar } = useSnackbar();

    async function deletelecturer (event) {
        event.preventDefault()
        const response = await fetch('http://localhost:1337/deleteLecturer',
          {
            method: 'DELETE',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              email,
              id
            })
          });
          const data = await response.json()
          if(data.status==='ok'){
            enqueueSnackbar("Lecturer Delete Successfully!", { 
                variant: "success", 
                autoHideDuration: 3000 
            });
          }else if(data.status==='not found'){
            enqueueSnackbar("Lecturer Not Found", { 
                variant: "error", 
                autoHideDuration: 3000 
            });
          }
    }

  return (
    <div
      className="fixed bg-black/60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[600px] bg-white rounded-xl p-6 flex flex-col relative shadow-lg"
      >
        {/* Close Icon */}
        {/* <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        /> */}

        {/* Modal Title */}
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Are you Confirming Delete? {name}
        </h2>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="w-full sm:w-full cursor-pointer px-5 py-2.5 rounded-full text-white text-sm font-medium bg-green-700 hover:bg-green-800 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={deletelecturer}
            className="w-full sm:w-full cursor-pointer px-5 py-2.5 rounded-full text-white text-sm font-medium bg-red-700 hover:bg-red-800 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
