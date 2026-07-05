import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

function Analytics() {

  const navigate = useNavigate();

  const [tasks, setTasks] =
    useState([]);

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem('theme') ===
        'dark'
    );

  const token =
    localStorage.getItem('token');

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/tasks',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const weeklyData = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ].map((day, index) => {

    const completedCount =
      tasks.filter((task) => {

        if (
          task.status !== 'completed'
        ) return false;

        const taskDate =
          new Date(task.updated_at);

        return (
          taskDate.getDay() === index
        );
      }).length;

    return {
      day,
      completed: completedCount,
    };
  });

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
      {/* Top */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold">
          Productivity Analytics
        </h1>

        

      </div>

      {/* Weekly Chart */}

      <div
        className={`rounded-3xl p-8 border shadow-xl ${
          darkMode
            ? 'bg-[#07122b] border-gray-800'
            : 'bg-white border-gray-200'
        }`}
      >

        <h2 className="text-4xl font-bold mb-8">
          Weekly Productivity
        </h2>

        <div className="w-full h-[400px]">

          <ResponsiveContainer>

            <BarChart data={weeklyData}>

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="completed"
                fill="#4f46e5"
                radius={[12, 12, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Floating Theme */}

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

export default Analytics;