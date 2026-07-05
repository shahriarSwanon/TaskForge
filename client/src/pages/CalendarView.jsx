import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

function CalendarView() {

  const navigate = useNavigate();

  const [date, setDate] =
    useState(new Date());

  const [tasks, setTasks] =
    useState([]);

  const [selectedTasks, setSelectedTasks] =
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

  const handleDateChange = (value) => {

    setDate(value);

    const clickedDate =
      value.toISOString().split('T')[0];

    const matchedTasks =
      tasks.filter(
        (task) =>
          task.due_date?.split('T')[0] ===
          clickedDate
      );

    setSelectedTasks(matchedTasks);
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
        className="mb-6 bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl text-white transition-all duration-300"
      >
        Back
      </button>

      {/* Calendar */}

      <div
        className={`rounded-3xl p-8 border shadow-xl ${
          darkMode
            ? 'bg-[#07122b] border-gray-800'
            : 'bg-white border-gray-200'
        }`}
      >

        <h1 className="text-5xl font-bold mb-10">
          Task Calendar
        </h1>

        <div className="flex justify-center">

          <Calendar
            onChange={handleDateChange}
            value={date}
            className="custom-calendar"

            tileClassName={({ date, view }) => {

              if (view !== 'month')
                return;

              const currentDate =
                date
                  .toISOString()
                  .split('T')[0];

              const hasTask =
                tasks.some(
                  (task) =>
                    task.due_date?.split(
                      'T'
                    )[0] === currentDate
                );

              if (hasTask) {
                return 'task-date';
              }

              return null;
            }}
          />

        </div>

      </div>

      {/* Selected Date Tasks */}

      <div className="mt-10">

        <h2 className="text-4xl font-bold mb-6">
          Tasks on Selected Date
        </h2>

        {selectedTasks.length === 0 ? (

          <div
            className={`p-6 rounded-2xl ${
              darkMode
                ? 'bg-[#07122b]'
                : 'bg-white'
            }`}
          >
            No tasks found
          </div>

        ) : (

          <div className="grid gap-5">

            {selectedTasks.map((task) => (

              <div
                key={task.id}
                className={`p-6 rounded-2xl border-l-4 ${
                  task.status ===
                  'completed'
                    ? 'border-green-500'
                    : 'border-yellow-500'
                } ${
                  darkMode
                    ? 'bg-[#07122b]'
                    : 'bg-white'
                }`}
              >

                <h2 className="text-3xl font-bold">
                  {task.title}
                </h2>

                <p className="mt-3 text-gray-400">
                  {task.description}
                </p>

                <div className="flex gap-3 mt-5 flex-wrap">

                  <span className="bg-blue-500 px-4 py-2 rounded-xl">
                    {task.status}
                  </span>

                  <span className="bg-purple-500 px-4 py-2 rounded-xl">
                    {task.category}
                  </span>

                  <span className="bg-green-500 px-4 py-2 rounded-xl">
                    {task.priority}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

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

export default CalendarView;