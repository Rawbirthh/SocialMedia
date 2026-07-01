import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/authStore';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import DashboardLayout from '../pages/Dashboard/DashboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Users from '../pages/Dashboard/Users';
import Roles from '../pages/Dashboard/Roles';
import Permissions from '../pages/Dashboard/Permissions';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  if (!user?.roles?.includes('Admin')) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

const dashboardRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/users', element: <Users />, roles: ['Admin'] },
  { path: '/roles', element: <Roles />, roles: ['Admin'] },
  { path: '/permissions', element: <Permissions />, roles: ['Admin'] },
];

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {dashboardRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.roles ? <AdminRoute>{route.element}</AdminRoute> : route.element}
          />
        ))}
      </Route>
    </Routes>
  );
}
