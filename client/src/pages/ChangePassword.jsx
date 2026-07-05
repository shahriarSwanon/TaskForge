import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem('theme') ===
        'dark'
    );

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

  const handleChange = (e) => {

    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const changePassword = async () => {

    try {

      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {

        return toast.error(
          'Passwords do not match'
        );
      }

      const token =
        localStorage.getItem('token');

      const res = await axios.put(
        'http://localhost:5000/api/auth/change-password',
        {
          currentPassword:
            passwordData.currentPassword,
          newPassword:
            passwordData.newPassword,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        'Password change failed'
      );
    }
  };

  return (

    <>

      <Toaster position="top-center" />

      <div
        className={`min-h-screen p-6 transition-all duration-300 ${
          darkMode
            ? 'bg-[#020617] text-white'
            : 'bg-gray-100 text-black'
        }`}
      >

        {/* TOP BAR */}

        <div
          className={`flex justify-between items-center mb-8 p-6 rounded-3xl border shadow-2xl ${
            darkMode
              ? 'bg-[#07122b] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >

          <h1 className="text-4xl font-bold">
            Security Settings
          </h1>

          <button
            onClick={() =>
              navigate('/profile')
            }
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-2xl"
          >
            Back
          </button>

        </div>

        {/* CARD */}

        <div className="flex justify-center">

          <div
            className={`w-full max-w-xl rounded-3xl p-8 shadow-2xl border transition-all duration-300 ${
              darkMode
                ? 'bg-[#07122b] border-gray-800'
                : 'bg-white border-gray-200'
            }`}
          >

            <h1 className="text-4xl font-bold text-center mb-8">
              Change Password
            </h1>

            <div className="space-y-5">

              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={
                  passwordData.currentPassword
                }
                onChange={handleChange}
                className={`w-full p-4 rounded-2xl border outline-none ${
                  darkMode
                    ? 'bg-[#0f172a] border-gray-700 text-white'
                    : 'bg-gray-100 border-gray-300 text-black'
                }`}
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={
                  passwordData.newPassword
                }
                onChange={handleChange}
                className={`w-full p-4 rounded-2xl border outline-none ${
                  darkMode
                    ? 'bg-[#0f172a] border-gray-700 text-white'
                    : 'bg-gray-100 border-gray-300 text-black'
                }`}
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={
                  passwordData.confirmPassword
                }
                onChange={handleChange}
                className={`w-full p-4 rounded-2xl border outline-none ${
                  darkMode
                    ? 'bg-[#0f172a] border-gray-700 text-white'
                    : 'bg-gray-100 border-gray-300 text-black'
                }`}
              />

              <button
                onClick={changePassword}
                className="w-full bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300 text-white py-4 rounded-2xl text-lg font-semibold"
              >
                Update Password
              </button>

            </div>

          </div>

        </div>

        {/* DARK MODE */}

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

export default ChangePassword;