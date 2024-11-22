import React from 'react';
import { Trophy, TrendingUp, User } from 'lucide-react';
import { Employee } from '../types';
import { PerformanceChart } from './PerformanceChart';
import { useNavigate } from 'react-router-dom';

interface Props {
  employee: Employee;
  isTopPerformer: boolean;
}

export const EmployeeCard: React.FC<Props> = ({ employee, isTopPerformer }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative">
        <img
          src={employee.imageUrl}
          alt={employee.name}
          className="w-full h-48 object-cover"
        />
        {isTopPerformer && (
          <div className="absolute top-4 right-4 bg-yellow-400 rounded-full p-2">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{employee.name}</h3>
            <p className="text-gray-600">{employee.position}</p>
          </div>
          <div className="flex items-center gap-2 bg-[#1766FF]/10 px-3 py-1 rounded-full">
            <TrendingUp className="w-4 h-4 text-[#1766FF]" />
            <span className="text-[#1766FF] font-medium">{employee.performanceScore}%</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Performance Trend</h4>
          <PerformanceChart data={employee.monthlyScores} />
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span className="text-sm">{employee.department}</span>
          </div>
          <button 
            onClick={() => navigate(`/employee/${employee.id}`)}
            className="px-4 py-2 bg-[#1766FF] text-white rounded-lg hover:bg-[#1456DB] transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};