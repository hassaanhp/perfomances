import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, UserPlus, ClipboardList, LogOut, CheckSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EmployeeCard } from './EmployeeCard';
import { employees } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const topPerformer = employees.reduce((prev, current) => 
    prev.performanceScore > current.performanceScore ? prev : current
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-[#1766FF]">Performance Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Dashboard
              </button>
              {user?.role === 'admin' && (
                <button
                  onClick={() => navigate('/add-employee')}
                  className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add Employee
                </button>
              )}
              {user?.role === 'manager' && (
                <button
                  onClick={() => navigate('/new-review')}
                  className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <ClipboardList className="w-5 h-5 mr-2" />
                  New Review
                </button>
              )}
              {user?.role === 'hod' && (
                <button
                  onClick={() => navigate('/pending-reviews')}
                  className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <CheckSquare className="w-5 h-5 mr-2" />
                  Pending Reviews
                </button>
              )}
              <button
                onClick={() => logout()}
                className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Employee Performance Dashboard</h2>
          <p className="text-gray-600 mt-1">Track and monitor employee performance metrics</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map(employee => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              isTopPerformer={employee.id === topPerformer.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
};