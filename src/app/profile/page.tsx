"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Fitness enthusiast and software developer. I love challenging myself and pushing my limits.',
    avatar: '/avatars/avatar-1.png',
    joinedDate: 'January 2023',
    location: 'San Francisco, CA',
    stats: {
      completedChallenges: 15,
      activeChallenges: 3,
      createdChallenges: 2,
      achievementPoints: 450,
      level: 8,
      xpToNextLevel: 75,
    },
    achievements: [
      { id: 1, name: 'Early Bird', description: 'Complete a morning challenge for 7 consecutive days', date: '2023-03-15', icon: '🌅' },
      { id: 2, name: 'Bookworm', description: 'Read for at least 30 days in a row', date: '2023-04-22', icon: '📚' },
      { id: 3, name: 'Fitness Fanatic', description: 'Complete 10 fitness challenges', date: '2023-05-10', icon: '💪' },
      { id: 4, name: 'Challenge Creator', description: 'Create your first challenge', date: '2023-02-05', icon: '🏆' },
      { id: 5, name: 'Social Butterfly', description: 'Join 5 team challenges', date: '2023-06-18', icon: '🦋' },
    ],
    recentActivity: [
      { id: 1, type: 'challenge_completed', title: '30-Day Reading Challenge', date: '2 days ago' },
      { id: 2, type: 'achievement_earned', title: 'Social Butterfly', date: '1 week ago' },
      { id: 3, type: 'challenge_joined', title: 'Morning Workout Challenge', date: '2 weeks ago' },
      { id: 4, type: 'challenge_created', title: 'Digital Detox', date: '1 month ago' },
    ],
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className="container py-8 px-4">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                <p className="text-neutral-500 dark:text-neutral-400">
                  Joined {user.joinedDate} • {user.location}
                </p>
                <p className="mt-2 text-neutral-500 dark:text-neutral-400">{user.bio}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit Profile
              </Button>
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
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Challenges</CardTitle>
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
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.completedChallenges}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
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
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.activeChallenges}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievement Points</CardTitle>
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
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.achievementPoints}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Level</CardTitle>
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
                  <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.stats.level}</div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress to Level {user.stats.level + 1}</span>
                    <span>{user.stats.xpToNextLevel}%</span>
                  </div>
                  <Progress value={user.stats.xpToNextLevel} className="mt-1" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={user.location} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" defaultValue={user.bio} className="min-h-[100px]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Tabs defaultValue="achievements" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="challenges">My Challenges</TabsTrigger>
              </TabsList>
              
              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Your earned badges and accomplishments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {user.achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl">
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{achievement.name}</h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {achievement.description}
                            </p>
                            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                              Earned on {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest actions and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {user.recentActivity.map((activity) => (
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
                            {activity.type === 'challenge_created' && (
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
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium leading-none">{activity.title}</p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {activity.type === 'challenge_joined' && 'You joined a new challenge'}
                              {activity.type === 'challenge_completed' && 'You completed a challenge'}
                              {activity.type === 'achievement_earned' && 'You earned a new achievement'}
                              {activity.type === 'challenge_created' && 'You created a new challenge'}
                            </p>
                          </div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400">{activity.date}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Challenges Tab */}
              <TabsContent value="challenges">
                <Card>
                  <CardHeader>
                    <CardTitle>My Challenges</CardTitle>
                    <CardDescription>Challenges you've created or joined</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Active Challenges</h3>
                        <div className="mt-2 space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-md bg-neutral-100 dark:bg-neutral-800"></div>
                            <div className="flex-1">
                              <Link href="/challenges/1" className="font-medium hover:underline">
                                Morning Workout Challenge
                              </Link>
                              <div className="flex items-center gap-4">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">40% complete</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">20 days left</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-md bg-neutral-100 dark:bg-neutral-800"></div>
                            <div className="flex-1">
                              <Link href="/challenges/3" className="font-medium hover:underline">
                                Meditation Marathon
                              </Link>
                              <div className="flex items-center gap-4">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">25% complete</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">15 days left</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h3 className="font-medium">Created by You</h3>
                        <div className="mt-2 space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-md bg-neutral-100 dark:bg-neutral-800"></div>
                            <div className="flex-1">
                              <Link href="/challenges/6" className="font-medium hover:underline">
                                Digital Detox
                              </Link>
                              <div className="flex items-center gap-4">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">96 participants</p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Created 1 month ago</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Link href="/challenges/new">
                          <Button className="w-full">
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
                            Create New Challenge
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 