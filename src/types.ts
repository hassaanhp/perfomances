export type Rating = 'Outstanding' | 'Very Good' | 'Good' | 'Improvement Needed' | 'Unsatisfactory' | 'N/A';

export interface PerformanceCriteria {
  category: string;
  rating: Rating;
  points: number;
  maxPoints: number;
  comment: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  imageUrl: string;
  email: string;
  performanceScore: number;
  monthlyScores: { month: string; score: number }[];
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  date: string;
  criteria: PerformanceCriteria[];
  strengths: string[];
  improvements: string[];
  achievements: string[];
  status: 'pending' | 'approved' | 'rejected';
  totalScore: number;
  maxPossibleScore: number;
  comments?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'hod' | 'employee';
}