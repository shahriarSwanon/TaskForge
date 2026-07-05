import {
  Routes,
  Route,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AddTask from './pages/AddTask';
import Tasks from './pages/Tasks';
import CalendarView from './pages/CalendarView';
import Analytics from './pages/Analytics';
import Pomodoro from './pages/Pomodoro';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/add-task"
        element={<AddTask />}
      />

      <Route
        path="/tasks"
        element={<Tasks />}
      />

      <Route
        path="/calendar"
        element={<CalendarView />}
      />
      <Route
        path="/analytics"
        element={<Analytics />}
      />
      <Route
        path="/pomodoro"
        element={<Pomodoro />}
      />
      <Route
        path="/change-password"
        element={<ChangePassword />}
      />

    </Routes>
  );
}

export default App;