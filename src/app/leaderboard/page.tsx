"use client";

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define user interface
interface User {
  id: number;
  name: string;
  points: number;
  completedChallenges: number;
  avatar: string;
  rank: number;
}

// Mock data for global leaderboard
const globalUsers: User[] = [
  { id: 1, name: 'Alex Johnson', points: 1250, completedChallenges: 42, avatar: '👨‍💼', rank: 1 },
  { id: 2, name: 'Sarah Williams', points: 1180, completedChallenges: 38, avatar: '👩‍💼', rank: 2 },
  { id: 3, name: 'Michael Brown', points: 1050, completedChallenges: 35, avatar: '👨‍🦱', rank: 3 },
  { id: 4, name: 'Emily Davis', points: 980, completedChallenges: 32, avatar: '👩‍🦰', rank: 4 },
  { id: 5, name: 'David Miller', points: 920, completedChallenges: 30, avatar: '👨‍🦲', rank: 5 },
  { id: 6, name: 'Jessica Wilson', points: 870, completedChallenges: 28, avatar: '👩‍🦱', rank: 6 },
  { id: 7, name: 'James Taylor', points: 810, completedChallenges: 26, avatar: '👨‍🦳', rank: 7 },
  { id: 8, name: 'Olivia Martinez', points: 760, completedChallenges: 24, avatar: '👩‍🦳', rank: 8 },
  { id: 9, name: 'Robert Anderson', points: 720, completedChallenges: 22, avatar: '👨', rank: 9 },
  { id: 10, name: 'Sophia Thomas', points: 680, completedChallenges: 20, avatar: '👩', rank: 10 },
  { id: 11, name: 'William Jackson', points: 650, completedChallenges: 19, avatar: '👨‍🦰', rank: 11 },
  { id: 12, name: 'Isabella White', points: 620, completedChallenges: 18, avatar: '👩‍🦰', rank: 12 },
  { id: 13, name: 'Daniel Harris', points: 590, completedChallenges: 17, avatar: '👨‍🦱', rank: 13 },
  { id: 14, name: 'Mia Martin', points: 560, completedChallenges: 16, avatar: '👩‍🦱', rank: 14 },
  { id: 15, name: 'Joseph Thompson', points: 530, completedChallenges: 15, avatar: '👨‍🦲', rank: 15 },
];

// Mock data for friends leaderboard (subset of global users)
const friendsUsers: User[] = [
  { id: 2, name: 'Sarah Williams', points: 1180, completedChallenges: 38, avatar: '👩‍💼', rank: 1 },
  { id: 5, name: 'David Miller', points: 920, completedChallenges: 30, avatar: '👨‍🦲', rank: 2 },
  { id: 7, name: 'James Taylor', points: 810, completedChallenges: 26, avatar: '👨‍🦳', rank: 3 },
  { id: 10, name: 'Sophia Thomas', points: 680, completedChallenges: 20, avatar: '👩', rank: 4 },
  { id: 13, name: 'Daniel Harris', points: 590, completedChallenges: 17, avatar: '👨‍🦱', rank: 5 },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All' },
  { id: 'fitness', name: 'Fitness' },
  { id: 'reading', name: 'Reading' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'nutrition', name: 'Nutrition' },
  { id: 'mindfulness', name: 'Mindfulness' },
];

// Time frames for filtering
const timeFrames = [
  { id: 'all-time', name: 'All Time' },
  { id: 'this-month', name: 'This Month' },
  { id: 'this-week', name: 'This Week' },
];

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('all-time');

  // Filter users based on search query
  const filterUsers = (users: User[]): User[] => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredGlobalUsers = filterUsers(globalUsers);
  const filteredFriendsUsers = filterUsers(friendsUsers);

  // Function to render medal or rank
  const renderRank = (rank: number) => {
    if (rank === 1) {
      return <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 font-bold">🥇</span>;
    } else if (rank === 2) {
      return <span className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-200 text-neutral-600 font-bold">🥈</span>;
    } else if (rank === 3) {
      return <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-bold">🥉</span>;
    } else {
      return <span className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 font-bold">{rank}</span>;
    }
  };

  return (
    <MainLayout>
      <div className="container py-8 px-4 md:px-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                See how you rank against others in challenge completion
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
              />
            </div>
          </div>

          {/* Filter Options */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {timeFrames.map((timeFrame) => (
                <Button
                  key={timeFrame.id}
                  variant={selectedTimeFrame === timeFrame.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeFrame(timeFrame.id)}
                >
                  {timeFrame.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Leaderboard Tabs */}
          <Tabs defaultValue="global" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="global">Global Leaderboard</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
            </TabsList>
            
            {/* Global Leaderboard Tab */}
            <TabsContent value="global">
              <Card>
                <CardHeader>
                  <CardTitle>Global Rankings</CardTitle>
                  <CardDescription>
                    Top performers across all StriveSync users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-neutral-50 dark:bg-neutral-900">
                          <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400">Rank</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400">User</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-neutral-500 dark:text-neutral-400">Points</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-neutral-500 dark:text-neutral-400">Completed</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {filteredGlobalUsers.map((user) => (
                          <tr 
                            key={user.id} 
                            className={`hover:bg-neutral-50 dark:hover:bg-neutral-900 ${
                              user.rank <= 3 ? 'bg-neutral-50 dark:bg-neutral-900/50' : ''
                            }`}
                          >
                            <td className="px-4 py-4 text-sm">
                              {renderRank(user.rank)}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600">
                                  <span>{user.avatar}</span>
                                </div>
                                <span className="font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-right font-semibold">
                              {user.points.toLocaleString()}
                            </td>
                            <td className="px-4 py-4 text-sm text-right text-neutral-500 dark:text-neutral-400">
                              {user.completedChallenges} challenges
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Friends Leaderboard Tab */}
            <TabsContent value="friends">
              <Card>
                <CardHeader>
                  <CardTitle>Friends Rankings</CardTitle>
                  <CardDescription>
                    See how your friends are performing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredFriendsUsers.length > 0 ? (
                    <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-neutral-50 dark:bg-neutral-900">
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400">Rank</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400">User</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-neutral-500 dark:text-neutral-400">Points</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-neutral-500 dark:text-neutral-400">Completed</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                          {filteredFriendsUsers.map((user) => (
                            <tr 
                              key={user.id} 
                              className={`hover:bg-neutral-50 dark:hover:bg-neutral-900 ${
                                user.rank <= 3 ? 'bg-neutral-50 dark:bg-neutral-900/50' : ''
                              }`}
                            >
                              <td className="px-4 py-4 text-sm">
                                {renderRank(user.rank)}
                              </td>
                              <td className="px-4 py-4 text-sm">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600">
                                    <span>{user.avatar}</span>
                                  </div>
                                  <span className="font-medium">{user.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-right font-semibold">
                                {user.points.toLocaleString()}
                              </td>
                              <td className="px-4 py-4 text-sm text-right text-neutral-500 dark:text-neutral-400">
                                {user.completedChallenges} challenges
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 text-neutral-500 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-8 w-8"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No friends found</h3>
                      <p className="text-neutral-500 max-w-md mx-auto mb-6">
                        Add friends to see how you compare with them on the leaderboard.
                      </p>
                      <Button>Find Friends</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Your Position Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Position</CardTitle>
              <CardDescription>
                Your current ranking and statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600">
                    <span className="text-xl">👨‍💼</span>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Your Rank</p>
                    <p className="text-2xl font-bold">4th</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Points</p>
                  <p className="text-2xl font-bold">980</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Completed Challenges</p>
                  <p className="text-2xl font-bold">32</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Points to Next Rank</p>
                  <p className="text-2xl font-bold">70</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 