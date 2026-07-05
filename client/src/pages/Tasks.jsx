import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Tasks() {

  const navigate = useNavigate();

  const [tasks, setTasks] =
    useState([]);

  const [filter, setFilter] =
    useState('all');

  const [searchTerm, setSearchTerm] =
    useState('');

  const [sortOption, setSortOption] =
    useState('newest');

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem('theme') ===
        'dark'
    );

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

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {

    localStorage.setItem(
      'theme',
      darkMode ? 'dark' : 'light'
    );

  }, [darkMode]);

  const toggleTaskStatus = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/toggle/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

      toast.success(
        'Task updated'
      );

    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

      toast.success(
        'Task deleted'
      );

    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {

      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'completed'
          ? task.status === 'completed'
          : task.status !== 'completed';

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        task.description
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      return (
        matchesFilter &&
        matchesSearch
      );

    })
    .sort((a, b) => {

      if (sortOption === 'newest') {
        return b.id - a.id;
      }

      if (sortOption === 'oldest') {
        return a.id - b.id;
      }

if (sortOption === 'priority') {

  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  return (
    priorityOrder[a.priority] -
    priorityOrder[b.priority]
  );
}

if (sortOption === 'dueDate') {

  return (
    new Date(a.due_date) -
    new Date(b.due_date)
  );
}

return 0;

      return 0;

    });

  return (

    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        darkMode
          ? 'bg-[#020617] text-white'
          : 'bg-gray-100 text-black'
      }`}
    >

      {/* Back */}

      <button
        onClick={() =>
          navigate('/dashboard')
        }
        className="mb-6 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 rounded-xl transition-all duration-300"
      >
        Back
      </button>

      {/* Filters */}

      <div className="flex gap-4 mb-5 flex-wrap">

        <button
          onClick={() =>
            setFilter('all')
          }
          className={`px-5 py-3 rounded-xl transition-all duration-300 ${
            filter === 'all'
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-300 text-black hover:bg-gray-400'
          }`}
        >
          All
        </button>

        <button
          onClick={() =>
            setFilter('pending')
          }
          className={`px-5 py-3 rounded-xl transition-all duration-300 ${
            filter === 'pending'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-300 text-black hover:bg-gray-400'
          }`}
        >
          Pending
        </button>

        <button
          onClick={() =>
            setFilter('completed')
          }
          className={`px-5 py-3 rounded-xl transition-all duration-300 ${
            filter === 'completed'
              ? 'bg-green-500 text-white'
              : 'bg-gray-300 text-black hover:bg-gray-400'
          }`}
        >
          Completed
        </button>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className={`w-full p-4 rounded-xl border mb-5 outline-none ${
          darkMode
            ? 'bg-[#07122b] border-gray-800 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-black'
        }`}
      />

      {/* Sort */}

      <select
        value={sortOption}
        onChange={(e) =>
          setSortOption(e.target.value)
        }
        className={`w-full p-4 rounded-xl border mb-6 outline-none ${
          darkMode
            ? 'bg-[#07122b] border-gray-800 text-white'
            : 'bg-white border-gray-300 text-black'
        }`}
      >
        <option value="newest">
          Newest First
        </option>

        <option value="oldest">
          Oldest First
        </option>

        <option value="priority">
          Priority
        </option>
        <option value="dueDate">
        Due Date
        </option>
      </select>

      {/* Tasks */}

      <div className="grid gap-5">

        {filteredTasks.map((task) => {

          const isOverdue =
            task.status !== 'completed' &&
            task.due_date &&
            new Date(task.due_date) <
              new Date();

          return (

            <div
              key={task.id}
              className={`rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.01] border-l-4 ${
  isOverdue
    ? 'border-red-500'
    : darkMode
    ? 'border-[#07122b]'
    : 'border-white'
} ${
  darkMode
    ? 'bg-[#07122b] text-white'
    : 'bg-white text-black'
}`}
            >

              <div className="flex flex-col lg:flex-row justify-between gap-6">

                <div>

                  <h2 className="text-3xl font-bold">
                    {task.title}
                  </h2>

                  <p className="mt-2 text-gray-400">
                    {task.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4">

                    <span className="bg-gray-200 text-black px-4 py-2 rounded-lg">
                      {task.priority}
                    </span>

                    <span className="bg-blue-200 text-black px-4 py-2 rounded-lg">
                      {task.status}
                    </span>

                    <span className="bg-green-200 text-black px-4 py-2 rounded-lg">
                      {task.due_date?.split(
                        'T'
                      )[0]}
                    </span>

                    <span className="bg-purple-500 text-white px-4 py-2 rounded-lg">
                      {task.category}
                    </span>

                    {isOverdue && (
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                        OVERDUE
                      </span>
                    )}

                  </div>

                </div>

                <div className="flex gap-3 flex-wrap">

                  <button
                    onClick={() =>
                      toggleTaskStatus(
                        task.id
                      )
                    }
                    className={`px-5 py-3 rounded-xl text-white transition-all duration-300 hover:scale-105 ${
                      task.status ===
                      'completed'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {task.status ===
                    'completed'
                      ? 'Mark Pending'
                      : 'Mark Complete'}
                  </button>

                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          );
        })}

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

export default Tasks;