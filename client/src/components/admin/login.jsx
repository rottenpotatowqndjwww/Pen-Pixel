import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios'
import { useAppContext } from '../../context/appContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAdmin } =  useAppContext()
  

const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      '/api/admin/login',
      { email, password },
      { withCredentials: true }
    );

    if (data.success) {
      toast.success("Successfully Logged In");
      setIsAdmin(true);
    } else {
      toast.error(data.message || "Invalid Credentials");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gray-100 text-sm text-gray-700"
    >
      <div className="flex flex-col gap-5 p-8 py-10 w-[90%] max-w-sm rounded-xl shadow-lg border border-gray-200 bg-white">
        <p className="text-2xl font-bold text-center text-gray-800">
          <span className="text-primary">Blogger</span> Login
        </p>

        <div className="w-full">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg w-full p-3 outline-none focus:ring-2 focus:ring-primary"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg w-full p-3 outline-none focus:ring-2 focus:ring-primary"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull text-white font-semibold w-full py-3 rounded-lg transition-all"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
