import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  FaPlay,
  FaPause,
  FaRedo,
} from 'react-icons/fa';
import alarmSound from '../assets/alarm.mp3';

function Pomodoro() {

  const navigate = useNavigate();

const [focusMinutes, setFocusMinutes] =
  useState(25);

const [breakMinutes, setBreakMinutes] =
  useState(5);

const focusTime =
  focusMinutes * 60;

const breakTime =
  breakMinutes * 60;

  const [secondsLeft, setSecondsLeft] =
    useState(focusTime);

  const [isRunning, setIsRunning] =
    useState(false);

  const [isBreak, setIsBreak] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem('theme') ===
        'dark'
    );
const [alarm] = useState(
  new Audio(alarmSound)
);

  useEffect(() => {

    let timer;

    if (isRunning) {

      timer = setInterval(() => {

        setSecondsLeft((prev) => {

if (prev === 0) {

  alarm.play();

  if (!isBreak) {

    setIsBreak(true);

    return breakTime;

  } else {

    setIsBreak(false);

    return focusTime;

  }
}

          return prev - 1;

        });

      }, 1000);
    }

    return () => clearInterval(timer);

  }, [isRunning, isBreak]);

  const minutes =
    Math.floor(secondsLeft / 60);

  const seconds =
    secondsLeft % 60;

  const totalTime =
    isBreak
      ? breakTime
      : focusTime;

  const progress =
    (secondsLeft / totalTime) * 100;

  return (

    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-all duration-300 ${
        darkMode
          ? 'bg-[#020617] text-white'
          : 'bg-gray-100 text-black'
      }`}
    >

      {/* Top */}

      <div className="absolute top-6 left-6">

      {/* Back Button */}

      <button
        onClick={() =>
          navigate('/dashboard')
        }
        className="mb-6 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 rounded-xl transition-all duration-300"
      >
        Back
      </button>

      </div>

      {/* Title */}

      <h1 className="text-5xl font-bold mb-12">

        {isBreak
          ? 'Break Time'
          : 'Focus Time'}

      </h1>

{/* Time Settings */}

<div className="flex gap-6 mb-10 flex-wrap justify-center">

  {/* Focus */}

  <div
    className={`p-5 rounded-2xl border ${
      darkMode
        ? 'bg-[#07122b] border-gray-800'
        : 'bg-white border-gray-200'
    }`}
  >

    <p className="mb-3 text-lg font-semibold">
      Focus Minutes
    </p>

    <input
      type="number"
      min="1"
      value={focusMinutes}
      onChange={(e) => {

        const value =
          Number(e.target.value);

        setFocusMinutes(value);

        if (!isRunning && !isBreak) {
          setSecondsLeft(value * 60);
        }

      }}
      className={`w-28 p-3 rounded-xl outline-none ${
        darkMode
          ? 'bg-[#0f172a]'
          : 'bg-gray-100'
      }`}
    />

  </div>

  {/* Break */}

  <div
    className={`p-5 rounded-2xl border ${
      darkMode
        ? 'bg-[#07122b] border-gray-800'
        : 'bg-white border-gray-200'
    }`}
  >

    <p className="mb-3 text-lg font-semibold">
      Break Minutes
    </p>

    <input
      type="number"
      min="1"
      value={breakMinutes}
      onChange={(e) => {

        const value =
          Number(e.target.value);

        setBreakMinutes(value);

      }}
      className={`w-28 p-3 rounded-xl outline-none ${
        darkMode
          ? 'bg-[#0f172a]'
          : 'bg-gray-100'
      }`}
    />

  </div>

</div>

      {/* Circle */}

      <div className="relative w-80 h-80">

        <svg
          className="transform -rotate-90"
          width="320"
          height="320"
        >

          {/* Background */}

          <circle
            cx="160"
            cy="160"
            r="140"
            stroke={
              darkMode
                ? '#1e293b'
                : '#d1d5db'
            }
            strokeWidth="15"
            fill="transparent"
          />

          {/* Progress */}

          <circle
            cx="160"
            cy="160"
            r="140"
            stroke={
              isBreak
                ? '#22c55e'
                : '#4f46e5'
            }
            strokeWidth="15"
            fill="transparent"
            strokeDasharray={
              2 * Math.PI * 140
            }
            strokeDashoffset={
              2 *
              Math.PI *
              140 *
              (1 - progress / 100)
            }
            strokeLinecap="round"
            style={{
              transition:
                'stroke-dashoffset 1s linear',
            }}
          />

        </svg>

        {/* Timer Text */}

        <div className="absolute inset-0 flex items-center justify-center">

          <h2 className="text-6xl font-bold">

            {String(minutes).padStart(
              2,
              '0'
            )}

            :

            {String(seconds).padStart(
              2,
              '0'
            )}

          </h2>

        </div>

      </div>

      {/* Controls */}

      <div className="flex gap-5 mt-12">

        {/* Start Pause */}

        <button
          onClick={() =>
            setIsRunning(!isRunning)
          }
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white transition-all duration-300 hover:scale-110 ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >

          {isRunning
            ? <FaPause />
            : <FaPlay />}

        </button>

        {/* Reset */}

        <button
          onClick={() => {

            setIsRunning(false);

            setIsBreak(false);

setSecondsLeft(
  focusMinutes * 60
);

          }}
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 hover:scale-110"
        >

          <FaRedo />

        </button>

      </div>

      {/* Mode Text */}

      <p className="mt-8 text-xl text-gray-400">

        {isBreak
          ? 'Take a short break'
          : 'Stay focused and productive'}

      </p>

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

export default Pomodoro;