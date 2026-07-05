import { useState } from 'react';

import {
  useNavigate,
  Link,
} from 'react-router-dom';

import axios from 'axios';

import toast from 'react-hot-toast';

import logo from '../assets/logo.png';

import { Helmet } from 'react-helmet';

function Login() {

  const [formData, setFormData] =
    useState({
      email: '',
      password: '',
    });

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem('theme') ===
        'dark'
    );

  const navigate = useNavigate();

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );

      toast.success(res.data.message);

      localStorage.setItem(
        'token',
        res.data.token
      );

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      navigate('/dashboard');

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        'Login failed'
      );
    }
  };

  return (

    <>

      <Helmet>
        <title>Login</title>
      </Helmet>

      <div
        className={`min-h-screen flex items-center justify-center p-6 transition-all duration-300 ${
          darkMode
            ? 'bg-[#020617] text-white'
            : 'bg-gray-100 text-black'
        }`}
      >

        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md rounded-3xl p-8 border shadow-2xl transition-all duration-300 ${
            darkMode
              ? 'bg-[#07122b] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >

          <div className="flex justify-center mb-6">

            <img
              src={logo}
              alt="TaskForge Logo"
              className="w-24 h-24"
            />

          </div>

          <h2 className="text-4xl font-bold text-center mb-8">
            TaskForge
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={`w-full p-4 rounded-2xl border outline-none mb-5 transition-all duration-300 ${
              darkMode
                ? 'bg-[#0f172a] border-gray-700 text-white'
                : 'bg-gray-100 border-gray-300 text-black'
            }`}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={`w-full p-4 rounded-2xl border outline-none mb-6 transition-all duration-300 ${
              darkMode
                ? 'bg-[#0f172a] border-gray-700 text-white'
                : 'bg-gray-100 border-gray-300 text-black'
            }`}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 text-white py-4 rounded-2xl text-lg font-semibold"
          >
            Login
          </button>

          <p className="text-center mt-6">

            Don't have an account?{' '}

            <Link
              to="/register"
              className="text-blue-500 font-bold hover:underline"
            >
              Register
            </Link>

          </p>

        </form>

        {/* Floating Theme Button */}

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-yellow-400 text-black text-2xl shadow-xl hover:scale-110 transition-all duration-300"
        >
          {darkMode ? '☀' : '🌙'}
        </button>

      </div>

    </>
  );
}

export default Login;