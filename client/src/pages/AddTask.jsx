import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddTask() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem('theme') ===
        'dark'
    );

  const [formData, setFormData] =
    useState({
      title: '',
      description: '',
      priority: 'medium',
      due_date: '',
      category: '',
    });

  const token =
    localStorage.getItem('token');

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

      await axios.post(
        'http://localhost:5000/api/tasks/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        'Task created successfully'
      );

      navigate('/tasks');

    } catch (error) {

      console.log(error);

      toast.error(
        'Failed to add task'
      );

    }
  };

  return (

    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        darkMode
          ? 'bg-[#020617] text-white'
          : 'bg-gray-100 text-black'
      }`}
    >

      {/* Back Button */}

      <button
        onClick={() =>
          navigate('/dashboard')
        }
        className="mb-6 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 rounded-xl transition-all duration-300"
      >
        Back
      </button>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className={`rounded-2xl p-6 border shadow-lg ${
          darkMode
            ? 'bg-[#07122b] border-gray-800'
            : 'bg-white border-gray-200'
        }`}
      >

        <h1 className="text-3xl font-bold mb-6">
          Add New Task
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
            className={`p-4 rounded-xl border outline-none transition-all duration-300 ${
              darkMode
                ? 'bg-[#0f172a] border-gray-700 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black'
            }`}
          />

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className={`p-4 rounded-xl border outline-none transition-all duration-300 ${
              darkMode
                ? 'bg-[#0f172a] border-gray-700 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          />

          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className={`p-4 rounded-xl border outline-none md:col-span-2 transition-all duration-300 ${
              darkMode
                ? 'bg-[#0f172a] border-gray-700 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-black'
            }`}
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={`p-4 rounded-xl border outline-none transition-all duration-300 ${
              darkMode
                ? 'bg-[#0f172a] border-gray-700 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          >
            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`p-4 rounded-xl border outline-none transition-all duration-300 ${
              darkMode
                ? 'bg-[#0f172a] border-gray-700 text-white'
                : 'bg-white border-gray-300 text-black'
            }`}
          >
            <option value="">
              Select Category
            </option>

            <option value="Study">
              Study
            </option>

            <option value="Work">
              Work
            </option>

            <option value="Personal">
              Personal
            </option>

            <option value="Research">
              Research
            </option>

            <option value="Urgent">
              Urgent
            </option>
          </select>

        </div>

        <button
          type="submit"
          className="mt-6 bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
        >
          Add Task
        </button>

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

export default AddTask;