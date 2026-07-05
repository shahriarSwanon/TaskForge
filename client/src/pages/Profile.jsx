import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Profile() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem('token');

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem('theme') ===
        'dark'
    );

  const [formData, setFormData] =
    useState({
      username: '',
      email: '',
      profile_image: '',
    });

  const fetchProfile = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchProfile();

  }, []);

  useEffect(() => {

    localStorage.setItem(
      'theme',
      darkMode ? 'dark' : 'light'
    );

  }, [darkMode]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.put(
        'http://localhost:5000/api/profile/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        res.data.message ||
        'Profile updated successfully'
      );

      localStorage.setItem(
        'user',
        JSON.stringify({
          ...JSON.parse(
            localStorage.getItem('user')
          ),
          username: formData.username,
          email: formData.email,
          profile_image:
            formData.profile_image,
        })
      );

    } catch (error) {

      console.log(error);

      toast.error(
        'Failed to update profile'
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
          className={`flex justify-between items-center mb-10 p-6 rounded-3xl border shadow-2xl ${
            darkMode
              ? 'bg-[#07122b] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >

          <h1 className="text-4xl font-bold">
            Profile Settings
          </h1>

          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate('/dashboard')
              }
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-2xl"
            >
              Dashboard
            </button>

            <button
              onClick={() => {

                localStorage.removeItem(
                  'token'
                );

                localStorage.removeItem(
                  'user'
                );

                navigate('/login');

              }}
              className="bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300 text-white px-6 py-3 rounded-2xl"
            >
              Logout
            </button>

          </div>

        </div>

        {/* CENTERED PROFILE */}

        <div className="flex justify-center items-center">

          <form
            onSubmit={handleSubmit}
            className={`w-full max-w-2xl rounded-3xl p-8 shadow-2xl border transition-all duration-300 ${
              darkMode
                ? 'bg-[#07122b] border-gray-800'
                : 'bg-white border-gray-200'
            }`}
          >

            <div className="flex flex-col items-center">

              <img
                src={
                  formData.profile_image ||
                  'https://i.imgur.com/HeIi0wU.png'
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-xl mb-5"
              />

              <h1 className="text-4xl font-bold mb-8">
                My Profile
              </h1>

            </div>

            <div className="space-y-5">

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-4 rounded-2xl border outline-none transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#0f172a] border-gray-700 text-white'
                    : 'bg-gray-100 border-gray-300 text-black'
                }`}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-4 rounded-2xl border outline-none transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#0f172a] border-gray-700 text-white'
                    : 'bg-gray-100 border-gray-300 text-black'
                }`}
              />

              <input
                type="text"
                name="profile_image"
                placeholder="Profile Image URL"
                value={formData.profile_image}
                onChange={handleChange}
                className={`w-full p-4 rounded-2xl border outline-none transition-all duration-300 ${
                  darkMode
                    ? 'bg-[#0f172a] border-gray-700 text-white'
                    : 'bg-gray-100 border-gray-300 text-black'
                }`}
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate('/change-password')
                }
                className="w-full bg-red-500 hover:bg-red-600 hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg"
              >
                Change Password
              </button>

            </div>

          </form>

        </div>

        {/* FLOATING DARK MODE */}

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

export default Profile;