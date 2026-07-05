import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import logo from '../assets/logo.png';

import toast from 'react-hot-toast';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaArrowRight,
  FaList,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';

function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] =
    useState([]);

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem('theme') ===
        'dark'
    );

  const storedUser =
    localStorage.getItem('user');

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const token =
    localStorage.getItem('token');

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

  /* FETCH TASKS */

  useEffect(() => {

    fetchTasks();

    if (
      Notification.permission !==
      'granted'
    ) {

      Notification.requestPermission();

    }

  }, []);

  /* NOTIFICATIONS */

  useEffect(() => {

    if (
      Notification.permission !==
      'granted'
    ) return;

    tasks.forEach((task) => {

      if (
        task.status !== 'completed' &&
        task.due_date
      ) {

        const today =
          new Date()
            .toISOString()
            .split('T')[0];

        const taskDate =
          task.due_date.split('T')[0];

        /* TODAY DEADLINE */

        if (today === taskDate) {

          new Notification(
            'Task Deadline Today',
            {
              body:
                `${task.title} deadline is today`,
            }
          );

          toast(
            `${task.title} deadline is today`,
            {
              icon: '⚠️',
            }
          );
        }

        /* OVERDUE */

        if (
          new Date(taskDate) <
          new Date(today)
        ) {

          toast.error(
            `${task.title} is overdue`
          );
        }
      }
    });

  }, [tasks]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === 'completed'
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== 'completed'
  ).length;
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

      {/* Navbar */}

      <div
        className={`rounded-2xl p-5 mb-6 border shadow-lg flex flex-col lg:flex-row justify-between items-center gap-5 ${
          darkMode
            ? 'bg-[#07122b] border-gray-800'
            : 'bg-white border-gray-200'
        }`}
      >

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14"
          />

          <h1 className="text-4xl font-bold">
            TaskForge
          </h1>

        </div>

        <p className="text-xl text-gray-300">
          Welcome, {user.username}
        </p>

        <div className="flex gap-3">

          <button
            onClick={() =>
              navigate('/profile')
            }
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-5 py-3 rounded-xl transition-all duration-300"
          >
            <FaUser className="text-sm" />
            Profile
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
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl transition-all duration-300"
          >
            <FaSignOutAlt className="text-sm" />
            Logout
          </button>

        </div>

      </div>

      {/* Analytics */}

      <div
        className={`rounded-2xl p-6 mb-6 border shadow-lg ${
          darkMode
            ? 'bg-[#07122b] border-gray-800'
            : 'bg-white border-gray-200'
        }`}
      >

        <h2 className="text-3xl font-bold mb-6">
          Task Analytics
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">

          {/* Pending */}

          <div className="text-center">

            <div className="flex items-center gap-2 justify-center">

              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>

              <p className="text-lg">
                Pending
              </p>

            </div>

            <h1 className="text-4xl font-bold text-yellow-400 mt-2">
              {pendingTasks}
            </h1>

            <p className="text-lg text-yellow-300 mt-1">
              {totalTasks === 0
                ? 0
                : Math.round(
                    (pendingTasks /
                      totalTasks) *
                      100
                  )}
              %
            </p>

          </div>

          {/* Chart */}

          <div className="w-[220px] h-[220px]">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={[
                    {
                      name: 'Pending',
                      value: pendingTasks,
                    },
                    {
                      name: 'Completed',
                      value: completedTasks,
                    },
                  ]}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >

                  <Cell fill="#facc15" />

                  <Cell fill="#22c55e" />

                </Pie>

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* Completed */}

          <div className="text-center">

            <div className="flex items-center gap-2 justify-center">

              <div className="w-3 h-3 rounded-full bg-green-500"></div>

              <p className="text-lg">
                Completed
              </p>

            </div>

            <h1 className="text-4xl font-bold text-green-400 mt-2">
              {completedTasks}
            </h1>

            <p className="text-lg text-green-300 mt-1">
              {totalTasks === 0
                ? 0
                : Math.round(
                    (completedTasks /
                      totalTasks) *
                      100
                  )}
              %
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* Total */}

        <div
          className={`rounded-2xl p-6 shadow-lg border flex items-center gap-4 ${
            darkMode
              ? 'bg-[#07122b] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >

          <div className="bg-indigo-500 p-4 rounded-xl text-2xl">
            <FaTasks />
          </div>

          <div>

            <h2 className="text-2xl font-semibold">
              Total Tasks
            </h2>

            <p className="text-4xl font-bold mt-1">
              {totalTasks}
            </p>

          </div>

        </div>

        {/* Pending */}

        <div
          className={`rounded-2xl p-6 shadow-lg border flex items-center gap-4 ${
            darkMode
              ? 'bg-[#07122b] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >

          <div className="bg-yellow-500 p-4 rounded-xl text-2xl">
            <FaClock />
          </div>

          <div>

            <h2 className="text-2xl font-semibold">
              Pending
            </h2>

            <p className="text-4xl font-bold mt-1 text-yellow-400">
              {pendingTasks}
            </p>

          </div>

        </div>

        {/* Completed */}

        <div
          className={`rounded-2xl p-6 shadow-lg border flex items-center gap-4 ${
            darkMode
              ? 'bg-[#07122b] border-gray-800'
              : 'bg-white border-gray-200'
          }`}
        >

          <div className="bg-green-500 p-4 rounded-xl text-2xl">
            <FaCheckCircle />
          </div>

          <div>

            <h2 className="text-2xl font-semibold">
              Completed
            </h2>

            <p className="text-4xl font-bold mt-1 text-green-400">
              {completedTasks}
            </p>

          </div>

        </div>
        

      </div>



      {/* Navigation Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Add Task */}

        <div
          onClick={() =>
            navigate('/add-task')
          }
          className="cursor-pointer rounded-2xl p-8 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:scale-[1.02] transition-all duration-300 shadow-lg flex justify-between items-center"
        >

          <div className="flex items-center gap-5">

            <div className="bg-white/20 p-5 rounded-full text-3xl">
              <FaPlus />
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Add New Task
              </h2>

              <p className="text-md mt-2 text-gray-200">
                Create a new task
              </p>

            </div>

          </div>

          <FaArrowRight className="text-3xl" />

        </div>

        {/* View Tasks */}

        <div
          onClick={() =>
            navigate('/tasks')
          }
          className="cursor-pointer rounded-2xl p-8 bg-gradient-to-r from-emerald-600 to-green-500 hover:scale-[1.02] transition-all duration-300 shadow-lg flex justify-between items-center"
        >

          <div className="flex items-center gap-5">

            <div className="bg-white/20 p-5 rounded-full text-3xl">
              <FaList />
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                View Tasks
              </h2>

              <p className="text-md mt-2 text-gray-200">
                Manage all tasks
              </p>

            </div>

          </div>

          <FaArrowRight className="text-3xl" />

        </div>

        {/* Calendar */}

        <div
          onClick={() =>
            navigate('/calendar')
          }
          className="cursor-pointer rounded-2xl p-8 bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 shadow-lg flex justify-between items-center"
        >

          <div className="flex items-center gap-5">

            <div className="bg-white/20 p-5 rounded-full text-3xl">
              📅
            </div>

            <div>

              <h2 className="text-3xl font-bold">
                Calendar
              </h2>

              <p className="text-md mt-2 text-gray-200">
                View task deadlines
              </p>

            </div>

          </div>

          <FaArrowRight className="text-3xl" />

        </div>

{/* Analytics */}

<div
  onClick={() =>
    navigate('/analytics')
  }
  className="cursor-pointer rounded-2xl p-8 bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-[1.02] transition-all duration-300 shadow-lg flex justify-between items-center"
>

  <div className="flex items-center gap-5">

    <div className="bg-white/20 p-5 rounded-full text-3xl">
      📊
    </div>

    <div>

      <h2 className="text-3xl font-bold">
        Analytics
      </h2>

      <p className="text-md mt-2 text-gray-200">
        Weekly productivity stats
      </p>

    </div>

  </div>

</div>

{/* Pomodoro */}

<div
  onClick={() =>
    navigate('/pomodoro')
  }
  className="cursor-pointer rounded-2xl p-8 bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] transition-all duration-300 shadow-lg flex justify-between items-center"
>

  <div className="flex items-center gap-5">

    <div className="bg-white/20 p-5 rounded-full text-3xl">
      ⏳
    </div>

    <div>

      <h2 className="text-3xl font-bold">
        Pomodoro Timer
      </h2>

      <p className="text-md mt-2 text-gray-200">
        Focus timer for productivity
      </p>

    </div>

  </div>

</div>


      </div>

      {/* Floating Dark Mode */}

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

export default Dashboard;