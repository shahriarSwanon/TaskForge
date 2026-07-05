import { useState } from 'react';

import toast from 'react-hot-toast';

import logo from '../assets/logo.png';

import {
  useNavigate,
  Link,
} from 'react-router-dom';

import axios from 'axios';

function Register() {

  const [formData, setFormData] =
    useState({
      username: '',
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
        'http://localhost:5000/api/auth/register',
        formData
      );

      toast.success(res.data.message);

      navigate('/login');

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        'Registration failed'
      );
    }
  };

  return (

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
          Create Account
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className={`w-full p-4 rounded-2xl border outline-none mb-5 transition-all duration-300 ${
            darkMode
              ? 'bg-[#0f172a] border-gray-700 text-white'
              : 'bg-gray-100 border-gray-300 text-black'
          }`}
          required
        />

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
          minLength={6}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-white py-4 rounded-2xl text-lg font-semibold"
        >
          Register
        </button>

        <p className="mt-6 text-center">

          Already have an account?{' '}

          <Link
            to="/login"
            className="text-blue-500 font-bold hover:underline"
          >
            Login
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
  );
}

export default Register;