import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardAdmin from './pages/Dashboard'
import { useEffect } from 'react';
import { useUserStore } from '../stores/user';
import { PrivateRoute } from './components/private-router/Private-Router';

export default function App() {
  useEffect(() => {
    useUserStore.getState().loadUser();
  }, []);


  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard-admin" element={
          <PrivateRoute>
            <DashboardAdmin />
          </PrivateRoute>
        } />

      </Routes>
    </div>
  )
}
