import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { PerformanceReview } from '../types';
import { employees } from '../data/mockData';
import { BackButton } from './BackButton';

// Mock pending reviews data
const MOCK_PENDING_REVIEWS: PerformanceReview[] = [
  {
    id: '1',
    employeeId: '1',
    reviewerId: '2',
    date: '2024-03-15',
    criteria: [],
    strengths: ['Leadership', 'Technical Skills'],
    improvements: ['Documentation'],
    achievements: ['Completed major project ahead of schedule'],
    status: 'pending',
    totalScore: 85,
    maxPossibleScore: 100
  }
];

export const PendingReviews: React.FC = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(MOCK_PENDING_REVIEWS);

  const handleApprove = (reviewId: string) => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, status: 'approved' as const }
        : review
    ));
  };

  const handleReject = (reviewId: string) => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, status: 'rejected' as const }
        : review
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <BackButton />
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Performance Reviews</h2>
        
        <div className="space-y-6">
          {reviews.map(review => {
            const employee = employees.find(emp => emp.id === review.reviewerId);
            return (
              <div
                key={review.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-[#1766FF] transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {employee?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Submitted on {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/review/${review.id}`)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#1766FF] transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                      View
                    </button>
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(review.id)}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Score</h4>
                    <p className="text-lg font-semibold text-[#1766FF]">
                      {review.totalScore}/{review.maxPossibleScore}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Strengths</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {review.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Improvements</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {review.improvements.map((improvement, index) => (
                        <li key={index}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};