import React from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  // Mock data for dashboard
  const stats = [
    { title: 'Active Challenges', value: '5', change: '+2 from last month' },
    { title: 'Completed Challenges', value: '12', change: '+3 from last month' },
    { title: 'Team Challenges', value: '3', change: '+1 from last month' },
    { title: 'Achievement Points', value: '256', change: '+64 from last month' },
  ];
  
  const recentActivity = [
    { id: 1, type: 'challenge_joined', title: 'Morning Workout Challenge', date: '2 hours ago' },
    { id: 2, type: 'challenge_completed', title: '30-Day Reading Challenge', date: 'Yesterday' },
    { id: 3, type: 'achievement_earned', title: 'Early Bird Badge', date: '3 days ago' },
    { id: 4, type: 'team_joined', title: 'Fitness Enthusiasts', date: '1 week ago' },
  ];
  
  const upcomingChallenges = [
    { id: 1, title: 'Meditation Marathon', category: 'Wellness', startDate: 'Starts tomorrow' },
    { id: 2, title: 'Code 100 Days', category: 'Productivity', startDate: 'Starts in 3 days' },
    { id: 3, title: 'Healthy Eating', category: 'Nutrition', startDate: 'Starts next week' },
  ];
  
  return (
    <MainLayout>
      <div className="container py-8 px-4">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex gap-2">
              <Link href="/challenges/new">
                <Button>
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
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  New Challenge
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
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
                    className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Main Content */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Recent Activity */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        {activity.type === 'challenge_joined' && (
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
                            className="h-4 w-4"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        )}
                        {activity.type === 'challenge_completed' && (
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
                            className="h-4 w-4"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                        {activity.type === 'achievement_earned' && (
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
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="8" r="6" />
                            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                          </svg>
                        )}
                        {activity.type === 'team_joined' && (
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
                            className="h-4 w-4"
                          >
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {activity.type === 'challenge_joined' && 'You joined a new challenge'}
                          {activity.type === 'challenge_completed' && 'You completed a challenge'}
                          {activity.type === 'achievement_earned' && 'You earned a new achievement'}
                          {activity.type === 'team_joined' && 'You joined a new team'}
                        </p>
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">{activity.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Challenges */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Challenges</CardTitle>
                <CardDescription>Challenges starting soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingChallenges.map((challenge) => (
                    <div key={challenge.id} className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
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
                          className="h-4 w-4"
                        >
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-none">{challenge.title}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{challenge.category}</p>
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">{challenge.startDate}</div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Link href="/challenges">
                      <Button variant="outline" className="w-full">View All Challenges</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 