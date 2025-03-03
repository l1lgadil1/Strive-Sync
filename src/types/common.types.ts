/**
 * Common types used throughout the application
 */

// User related types
export interface IUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

// Challenge related types
export type ChallengeCategory = 
  | 'fitness'
  | 'nutrition'
  | 'mindfulness'
  | 'productivity'
  | 'learning'
  | 'finance'
  | 'social'
  | 'creativity';

export type ChallengeFrequency = 
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'custom';

export type ChallengeStatus = 
  | 'active'
  | 'completed'
  | 'failed'
  | 'upcoming'
  | 'draft';

export interface IChallenge {
  id: string;
  title: string;
  description: string;
  rules: string;
  category: ChallengeCategory;
  frequency: ChallengeFrequency;
  startDate: string;
  endDate: string;
  createdBy: string;
  status: ChallengeStatus;
  participants: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChallengeProgress {
  id: string;
  challengeId: string;
  userId: string;
  progress: number; // Percentage of completion
  status: 'in-progress' | 'completed' | 'failed';
  checkIns: ICheckIn[];
  createdAt: string;
  updatedAt: string;
}

export interface ICheckIn {
  id: string;
  challengeProgressId: string;
  date: string;
  completed: boolean;
  notes?: string;
  imageUrl?: string;
  createdAt: string;
}

// Pagination and filtering
export interface IPaginationParams {
  page: number;
  limit: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// API response types
export interface IApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

// Error types
export interface IApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
} 