"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface TeamDetailPageProps {
  params: {
    id: string;
  };
}

// Mock team data
const teamData = {
  id: 1,
  name: 'Fitness Enthusiasts',
  description: 'A team dedicated to fitness challenges and healthy living. We focus on daily workouts, nutrition tracking, and supporting each other in our fitness journeys.',
  members: 8,
  activeChallenges: 2,
  completedChallenges: 15,
  avatar: '💪',
  role: 'Admin',
  createdAt: '2023-09-15',
  privacy: 'Public',
};

// Mock team members
const teamMembers = [
  { id: 1, name: 'Alex Johnson', role: 'Admin', avatar: '👨‍💼', joinedAt: '2023-09-15' },
  { id: 2, name: 'Sarah Williams', role: 'Moderator', avatar: '👩‍💼', joinedAt: '2023-09-16' },
  { id: 3, name: 'Michael Brown', role: 'Member', avatar: '👨‍🦱', joinedAt: '2023-09-18' },
  { id: 4, name: 'Emily Davis', role: 'Member', avatar: '👩‍🦰', joinedAt: '2023-09-20' },
  { id: 5, name: 'David Miller', role: 'Member', avatar: '👨‍🦲', joinedAt: '2023-10-01' },
  { id: 6, name: 'Jessica Wilson', role: 'Member', avatar: '👩‍🦱', joinedAt: '2023-10-05' },
  { id: 7, name: 'James Taylor', role: 'Member', avatar: '👨‍🦳', joinedAt: '2023-10-10' },
  { id: 8, name: 'Olivia Martinez', role: 'Member', avatar: '👩‍🦳', joinedAt: '2023-10-15' },
];

// Mock team challenges
const teamChallenges = [
  {
    id: 1,
    title: 'Morning Workout Challenge',
    description: 'Complete a 30-minute workout every morning for 30 days',
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    participants: 8,
    progress: 65,
    status: 'active',
  },
  {
    id: 2,
    title: '10,000 Steps Challenge',
    description: 'Walk at least 10,000 steps every day for 2 weeks',
    startDate: '2023-11-15',
    endDate: '2023-11-29',
    participants: 7,
    progress: 40,
    status: 'active',
  },
  {
    id: 3,
    title: 'Healthy Eating Challenge',
    description: 'Eat at least 5 servings of fruits and vegetables daily for 3 weeks',
    startDate: '2023-10-01',
    endDate: '2023-10-21',
    participants: 6,
    progress: 100,
    status: 'completed',
  },
  {
    id: 4,
    title: 'Meditation Challenge',
    description: 'Meditate for at least 10 minutes every day for 2 weeks',
    startDate: '2023-09-15',
    endDate: '2023-09-29',
    participants: 5,
    progress: 100,
    status: 'completed',
  },
];

// Mock team activity
const teamActivity = [
  { id: 1, type: 'member_joined', user: 'Olivia Martinez', date: '2 weeks ago' },
  { id: 2, type: 'challenge_completed', challenge: 'Meditation Challenge', date: '1 month ago' },
  { id: 3, type: 'challenge_created', challenge: 'Morning Workout Challenge', user: 'Alex Johnson', date: '1 month ago' },
  { id: 4, type: 'member_joined', user: 'James Taylor', date: '2 months ago' },
  { id: 5, type: 'challenge_completed', challenge: 'Healthy Eating Challenge', date: '2 months ago' },
];

export default function TeamDetailPage({ params }: TeamDetailPageProps) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateChallengeModal, setShowCreateChallengeModal] = useState(false);

  // In a real app, we would fetch the team data based on the ID
  const teamId = params.id;
  
  const handleInviteMember = () => {
    // In a real app, this would send an invitation
    console.log(`Inviting ${inviteEmail} to team ${teamId}`);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <MainLayout>
      <div className="container py-8 px-4 md:px-8">
        <div className="flex flex-col gap-8">
          {/* Team Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600">
                <span className="text-3xl">{teamData.avatar}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{teamData.name}</h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                  {teamData.description}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm text-neutral-500">
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    {teamData.members} Members
                  </div>
                  <div className="flex items-center gap-1 text-sm text-neutral-500">
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
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                    {teamData.completedChallenges} Completed Challenges
                  </div>
                  <div className="flex items-center gap-1 text-sm text-neutral-500">
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
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Created {new Date(teamData.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" onClick={() => setShowInviteModal(true)}>
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Invite Members
              </Button>
              <Button onClick={() => setShowCreateChallengeModal(true)}>
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
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Create Challenge
              </Button>
            </div>
          </div>

          {/* Team Content Tabs */}
          <Tabs defaultValue="challenges" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            
            {/* Challenges Tab */}
            <TabsContent value="challenges">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Active Challenges</h3>
                  {teamChallenges.filter(c => c.status === 'active').map((challenge) => (
                    <Card key={challenge.id} className="mb-4">
                      <CardHeader>
                        <CardTitle>{challenge.title}</CardTitle>
                        <CardDescription>{challenge.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} />
                          <div className="grid grid-cols-2 gap-4 text-sm text-neutral-500">
                            <div>
                              <p className="font-medium">Start Date</p>
                              <p>{new Date(challenge.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="font-medium">End Date</p>
                              <p>{new Date(challenge.endDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/challenges/${challenge.id}`}>
                          <Button variant="outline" className="w-full">View Challenge</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Completed Challenges</h3>
                  {teamChallenges.filter(c => c.status === 'completed').map((challenge) => (
                    <Card key={challenge.id} className="mb-4">
                      <CardHeader>
                        <CardTitle>{challenge.title}</CardTitle>
                        <CardDescription>{challenge.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span>Completed</span>
                            <span>{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="bg-success-100" />
                          <div className="grid grid-cols-2 gap-4 text-sm text-neutral-500">
                            <div>
                              <p className="font-medium">Start Date</p>
                              <p>{new Date(challenge.startDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="font-medium">End Date</p>
                              <p>{new Date(challenge.endDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/challenges/${challenge.id}`}>
                          <Button variant="outline" className="w-full">View Results</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Members Tab */}
            <TabsContent value="members">
              <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-50 dark:bg-neutral-900">
                      <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400">Member</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500 dark:text-neutral-400">Joined</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-neutral-500 dark:text-neutral-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900">
                        <td className="px-4 py-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600">
                              <span>{member.avatar}</span>
                            </div>
                            <span className="font-medium">{member.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.role === 'Admin' 
                              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' 
                              : member.role === 'Moderator'
                              ? 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-300'
                              : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                          {new Date(member.joinedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-sm text-right">
                          <Button variant="ghost" size="sm">
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
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="19" cy="12" r="1"></circle>
                              <circle cx="5" cy="12" r="1"></circle>
                            </svg>
                            <span className="sr-only">Member options</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Team Activity</CardTitle>
                  <CardDescription>Recent activity in the team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {teamActivity.map((activity) => (
                      <div key={activity.id} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
                            {activity.type === 'member_joined' ? (
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
                                className="h-5 w-5 text-primary-600 dark:text-primary-400"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M19 8l2 2"></path>
                                <path d="M21 10l-2 2"></path>
                                <path d="M19 14l2 2"></path>
                                <path d="M21 16l-2 2"></path>
                              </svg>
                            ) : activity.type === 'challenge_completed' ? (
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
                                className="h-5 w-5 text-primary-600 dark:text-primary-400"
                              >
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                              </svg>
                            ) : (
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
                                className="h-5 w-5 text-primary-600 dark:text-primary-400"
                              >
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            )}
                          </div>
                          <div className="h-full w-px bg-neutral-200 dark:bg-neutral-800"></div>
                        </div>
                        <div className="pb-8">
                          <div className="text-sm font-medium">
                            {activity.type === 'member_joined' && (
                              <span><span className="font-semibold">{activity.user}</span> joined the team</span>
                            )}
                            {activity.type === 'challenge_completed' && (
                              <span>Team completed <span className="font-semibold">{activity.challenge}</span></span>
                            )}
                            {activity.type === 'challenge_created' && (
                              <span><span className="font-semibold">{activity.user}</span> created a new challenge: <span className="font-semibold">{activity.challenge}</span></span>
                            )}
                          </div>
                          <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{activity.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Invite Team Members</CardTitle>
              <CardDescription>
                Invite people to join your team and tackle challenges together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter email address" 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <select 
                    id="role"
                    className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary"
                  >
                    <option value="member">Member</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Personal Message (Optional)
                  </label>
                  <Input 
                    id="message" 
                    placeholder="Add a personal message to your invitation" 
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteMember}>
                Send Invitation
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Create Challenge Modal */}
      {showCreateChallengeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create Team Challenge</CardTitle>
              <CardDescription>
                Create a new challenge for your team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="challenge-title" className="text-sm font-medium">
                    Challenge Title
                  </label>
                  <Input id="challenge-title" placeholder="Enter challenge title" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="challenge-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input id="challenge-description" placeholder="Describe the challenge" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="start-date" className="text-sm font-medium">
                      Start Date
                    </label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="end-date" className="text-sm font-medium">
                      End Date
                    </label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="challenge-category" className="text-sm font-medium">
                    Category
                  </label>
                  <select 
                    id="challenge-category"
                    className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary"
                  >
                    <option value="fitness">Fitness</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="mindfulness">Mindfulness</option>
                    <option value="productivity">Productivity</option>
                    <option value="learning">Learning</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowCreateChallengeModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateChallengeModal(false)}>
                Create Challenge
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </MainLayout>
  );
} 