import React, { useState } from "react";
import Header from "../components/header";
import LectureLogin from '../pages/lec_login';
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userAvailable, setUserAvailable] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header user={userAvailable} />

      <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="flex flex-grow items-center justify-center bg-gray-200">
        <div className="p-10 sm-h-1/2 md-h-1/2 lg-h-1/2 w-1/2 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">ADMIN</h2>
          <p className="mt-2 text-gray-600 pb-3">This window only for a admin.</p>
          <button type="button"
          onClick={() => navigate("/admin_Login")}
        class="px-5 cursor-pointer py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-red-700 hover:bg-green-500 active:bg-blue-700">Log In</button>
        </div>
      </div>
      <div className="flex flex-grow items-center justify-center bg-gray-200">
        <div className="p-10 sm-h-1/2 md-h-1/2 lg-h-1/2 w-1/2 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">LECTURERS</h2>
          <p className="mt-2 text-gray-600 pb-3">This window for lecturers.</p>
          <button type="button"
          onClick={() => navigate("/lecturer_login")}
        className="px-5 cursor-pointer py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-green-700 hover:bg-red-800 active:bg-blue-700" >Log In</button>
        </div>
      </div>
</div>

      <Footer />
    </div>
  );
};

export default Home;
