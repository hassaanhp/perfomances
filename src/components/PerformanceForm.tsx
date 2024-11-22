import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Rating, PerformanceCriteria } from '../types';
import { employees } from '../data/mockData';
import { BackButton } from './BackButton';

const PERFORMANCE_CRITERIA = [
  { category: 'Client Retention', description: 'Ability to maintain and grow client relationships', maxPoints: 5 },
  { category: 'Communication', description: 'Effectiveness in verbal and written communication', maxPoints: 5 },
  { category: 'Time Management', description: 'Ability to prioritize and meet deadlines', maxPoints: 5 },
  { category: 'Problem Solving', description: 'Ability to analyze and resolve issues', maxPoints: 5 },
  { category: 'Accountability', description: 'Takes responsibility for actions and outcomes', maxPoints: 5 },
  { category: 'Teamwork', description: 'Collaborates effectively with others', maxPoints: 5 },
  { category: 'Attendance', description: 'Punctuality and attendance record', maxPoints: 5 },
  { category: 'Attitude', description: 'Demonstrates positive and professional attitude', maxPoints: 5 }
];

const RATING_OPTIONS: { value: Rating; label: string; points: number }[] = [
  { value: 'Outstanding', label: 'Outstanding (5 points)', points: 5 },
  { value: 'Very Good', label: 'Very Good (4 points)', points: 4 },
  { value: 'Good', label: 'Good (3 points)', points: 3 },
  { value: 'Improvement Needed', label: 'Improvement Needed (2 points)', points: 2 },
  { value: 'Unsatisfactory', label: 'Unsatisfactory (1 point)', points: 1 },
  { value: 'N/A', label: 'Not Applicable (0 points)', points: 0 }
];

export const PerformanceForm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [criteria, setCriteria] = useState<PerformanceCriteria[]>(
    PERFORMANCE_CRITERIA.map(c => ({
      category: c.category,
      rating: 'N/A',
      points: 0,
      maxPoints: c.maxPoints,
      comment: ''
    }))
  );
  const [strengths, setStrengths] = useState<string[]>(['']);
  const [improvements, setImprovements] = useState<string[]>(['']);
  const [achievements, setAchievements] = useState<string[]>(['']);

  const handleRatingChange = (index: number, rating: Rating) => {
    const newCriteria = [...criteria];
    const points = RATING_OPTIONS.find(option => option.value === rating)?.points || 0;
    newCriteria[index] = {
      ...newCriteria[index],
      rating,
      points
    };
    setCriteria(newCriteria);
  };

  const handleCommentChange = (index: number, comment: string) => {
    const newCriteria = [...criteria];
    newCriteria[index] = {
      ...newCriteria[index],
      comment
    };
    setCriteria(newCriteria);
  };

  const calculateTotalScore = () => {
    const totalPoints = criteria.reduce((sum, criterion) => sum + criterion.points, 0);
    const maxPossiblePoints = criteria.reduce((sum, criterion) => sum + criterion.maxPoints, 0);
    return { totalPoints, maxPossiblePoints };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { totalPoints, maxPossiblePoints } = calculateTotalScore();
    const review = {
      employeeId: selectedEmployee,
      criteria,
      strengths: strengths.filter(s => s.trim()),
      improvements: improvements.filter(i => i.trim()),
      achievements: achievements.filter(a => a.trim()),
      totalScore: totalPoints,
      maxPossibleScore: maxPossiblePoints,
      date: new Date().toISOString(),
      status: 'pending' as const
    };
    console.log(review);
    navigate('/dashboard');
  };

  const { totalPoints, maxPossiblePoints } = calculateTotalScore();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <BackButton />
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Performance Review</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Employee
          </label>
          <select
            required
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#1766FF] focus:ring-[#1766FF]"
          >
            <option value="">Select an employee...</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} - {emp.position}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-8">
          {PERFORMANCE_CRITERIA.map((criterion, index) => (
            <div key={criterion.category} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {criterion.category}
                  </h3>
                  <p className="text-sm text-gray-500">{criterion.description}</p>
                  <p className="text-sm text-[#1766FF] mt-1">
                    Current Score: {criteria[index].points}/{criterion.maxPoints} points
                  </p>
                </div>
                <select
                  value={criteria[index].rating}
                  onChange={(e) => handleRatingChange(index, e.target.value as Rating)}
                  className="rounded-lg border-gray-300 shadow-sm focus:border-[#1766FF] focus:ring-[#1766FF]"
                >
                  {RATING_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                value={criteria[index].comment}
                onChange={(e) => handleCommentChange(index, e.target.value)}
                placeholder="Add comments..."
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#1766FF] focus:ring-[#1766FF]"
                rows={2}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Key Strengths</h3>
            {strengths.map((strength, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={strength}
                  onChange={(e) => {
                    const newStrengths = [...strengths];
                    newStrengths[index] = e.target.value;
                    if (index === strengths.length - 1 && e.target.value) {
                      newStrengths.push('');
                    }
                    setStrengths(newStrengths);
                  }}
                  className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-[#1766FF] focus:ring-[#1766FF]"
                  placeholder="Enter a key strength..."
                />
                {index < strengths.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setStrengths(strengths.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Areas for Improvement</h3>
            {improvements.map((improvement, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={improvement}
                  onChange={(e) => {
                    const newImprovements = [...improvements];
                    newImprovements[index] = e.target.value;
                    if (index === improvements.length - 1 && e.target.value) {
                      newImprovements.push('');
                    }
                    setImprovements(newImprovements);
                  }}
                  className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-[#1766FF] focus:ring-[#1766FF]"
                  placeholder="Enter an area for improvement..."
                />
                {index < improvements.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setImprovements(improvements.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Major Achievements</h3>
            {achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => {
                    const newAchievements = [...achievements];
                    newAchievements[index] = e.target.value;
                    if (index === achievements.length - 1 && e.target.value) {
                      newAchievements.push('');
                    }
                    setAchievements(newAchievements);
                  }}
                  className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-[#1766FF] focus:ring-[#1766FF]"
                  placeholder="Enter a major achievement..."
                />
                {index < achievements.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setAchievements(achievements.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">Total Score</h3>
            <p className="text-3xl font-bold text-[#1766FF]">
              {totalPoints}/{maxPossiblePoints} points
            </p>
            <p className="text-sm text-gray-500">
              Performance Rating: {((totalPoints / maxPossiblePoints) * 100).toFixed(1)}%
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#1766FF] text-white rounded-lg hover:bg-[#1456DB]"
            >
              Submit for Approval
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};