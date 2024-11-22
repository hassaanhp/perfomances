import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BackButton } from './BackButton';
import { PerformanceChart } from './PerformanceChart';
import { employees } from '../data/mockData';
import { Mail, Briefcase, Users } from 'lucide-react';

export const EmployeeDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <BackButton />
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p>Employee not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <BackButton />
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-start gap-8">
          <img
            src={employee.imageUrl}
            alt={employee.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{employee.name}</h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                <span>{employee.position}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{employee.department}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>{employee.email}</span>
              </div>
            </div>
          </div>
          <div className="bg-[#1766FF] text-white px-4 py-2 rounded-full">
            {employee.performanceScore}% Performance
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Performance History</h3>
          <div className="h-80">
            <PerformanceChart data={employee.monthlyScores} />
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/new-review')}
            className="px-6 py-2 bg-[#1766FF] text-white rounded-lg hover:bg-[#1456DB]"
          >
            Create New Review
          </button>
        </div>
      </div>
    </div>
  );
};