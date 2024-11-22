import { Employee } from '../types';

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Senior Developer',
    department: 'Engineering',
    email: 'sarah.johnson@company.com',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    performanceScore: 95,
    monthlyScores: [
      { month: 'Jan', score: 92 },
      { month: 'Feb', score: 88 },
      { month: 'Mar', score: 95 },
      { month: 'Apr', score: 93 },
      { month: 'May', score: 97 },
      { month: 'Jun', score: 95 }
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Product Manager',
    department: 'Product',
    email: 'michael.chen@company.com',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    performanceScore: 88,
    monthlyScores: [
      { month: 'Jan', score: 85 },
      { month: 'Feb', score: 87 },
      { month: 'Mar', score: 88 },
      { month: 'Apr', score: 86 },
      { month: 'May', score: 90 },
      { month: 'Jun', score: 88 }
    ]
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'UX Designer',
    department: 'Design',
    email: 'emily.rodriguez@company.com',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    performanceScore: 92,
    monthlyScores: [
      { month: 'Jan', score: 90 },
      { month: 'Feb', score: 91 },
      { month: 'Mar', score: 93 },
      { month: 'Apr', score: 92 },
      { month: 'May', score: 94 },
      { month: 'Jun', score: 92 }
    ]
  }
];