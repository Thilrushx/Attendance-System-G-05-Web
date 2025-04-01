import React from 'react';
import Header from "../components/header";
import Footer from "../components/footer";

const LecLogin = () => {
    return (
        <div class="flex flex-col min-h-screen">
            <Header user={true}/>
            <div class="flex-grow flex items-center justify-center px-4">
    <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md">
      <div>
        <h2 class="lg:text-5xl text-3xl font-bold lg:leading-[px] text-slate-900">
          Login for Lecturer Access
        </h2>
      </div>

      <form class="max-w-md md:ml-auto w-full">
        <h3 class="text-slate-900 lg:text-3xl text-2xl font-bold mb-5">Sign in</h3>

        <div class="space-y-6">
          <div>
            <label class="text-sm text-slate-800 font-medium mb-2 block">Email</label>
            <input
              name="email"
              type="email"
              required
              class="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label class="text-sm text-slate-800 font-medium mb-2 block">Password</label>
            <input
              name="password"
              type="password"
              required
              class="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
              placeholder="Enter Password"
            />
          </div>
        </div>

        <div class="mt-5">
          <button
            type="button"
            class="w-full shadow-xl py-2.5 px-4 cursor-pointer text-sm font-semibold rounded text-white bg-green-600 hover:bg-blue-700 focus:outline-none"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
            <Footer/>
        </div>
    );
};

export default LecLogin;