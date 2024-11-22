import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { EmployeeForm } from './components/EmployeeForm';
import { PerformanceForm } from './components/PerformanceForm';
import { EmployeeDetails } from './components/EmployeeDetails';
import { PendingReviews } from './components/PendingReviews';

const PrivateRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <EmployeeForm onSubmit={console.log} />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-review"
            element={
              <PrivateRoute allowedRoles={['manager']}>
                <PerformanceForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/pending-reviews"
            element={
              <PrivateRoute allowedRoles={['hod']}>
                <PendingReviews />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee/:id"
            element={
              <PrivateRoute>
                <EmployeeDetails />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;