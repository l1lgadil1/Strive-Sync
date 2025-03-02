"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define interfaces for different team types
interface BaseTeam {
  id: number;
  name: string;
  description: string;
  members: number;
  activeChallenges: number;
  avatar: string;
}

interface MyTeam extends BaseTeam {
  completedChallenges: number;
  role: string;
}

interface TeamInvite extends BaseTeam {
  invitedBy: string;
}

interface DiscoverTeam extends BaseTeam {
  completedChallenges: number;
}

// Mock data for teams
const myTeams: MyTeam[] = [
  {
    id: 1,
    name: 'Fitness Enthusiasts',
    description: 'A team dedicated to fitness challenges and healthy living',
    members: 8,
    activeChallenges: 2,
    completedChallenges: 15,
    avatar: '💪',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Book Worms',
    description: 'Reading challenges and literary discussions',
    members: 12,
    activeChallenges: 1,
    completedChallenges: 10,
    avatar: '📚',
    role: 'Member',
  },
  {
    id: 3,
    name: 'Productivity Masters',
    description: 'Focused on productivity and time management challenges',
    members: 6,
    activeChallenges: 3,
    completedChallenges: 8,
    avatar: '⏱️',
    role: 'Member',
  },
];

const teamInvites: TeamInvite[] = [
  {
    id: 4,
    name: 'Meditation Circle',
    description: 'Mindfulness and meditation challenges',
    members: 15,
    activeChallenges: 2,
    avatar: '🧘',
    invitedBy: 'Sarah Williams',
  },
  {
    id: 5,
    name: 'Code Warriors',
    description: 'Programming and tech skill challenges',
    members: 20,
    activeChallenges: 4,
    avatar: '💻',
    invitedBy: 'Michael Brown',
  },
];

const discoverTeams: DiscoverTeam[] = [
  {
    id: 6,
    name: 'Language Learners',
    description: 'Challenges for learning new languages',
    members: 25,
    activeChallenges: 3,
    completedChallenges: 22,
    avatar: '🌎',
  },
  {
    id: 7,
    name: 'Creative Writers',
    description: 'Writing challenges and creative expression',
    members: 18,
    activeChallenges: 2,
    completedChallenges: 14,
    avatar: '✍️',
  },
  {
    id: 8,
    name: 'Financial Freedom',
    description: 'Challenges focused on financial literacy and savings',
    members: 30,
    activeChallenges: 4,
    completedChallenges: 16,
    avatar: '💰',
  },
  {
    id: 9,
    name: 'Culinary Adventures',
    description: 'Cooking challenges and recipe explorations',
    members: 22,
    activeChallenges: 3,
    completedChallenges: 19,
    avatar: '🍳',
  },
];

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);

  // Filter teams based on search query
  const filterMyTeams = (teams: MyTeam[]) => {
    return teams.filter(team => 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filterTeamInvites = (teams: TeamInvite[]) => {
    return teams.filter(team => 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filterDiscoverTeams = (teams: DiscoverTeam[]) => {
    return teams.filter(team => 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredMyTeams = filterMyTeams(myTeams);
  const filteredTeamInvites = filterTeamInvites(teamInvites);
  const filteredDiscoverTeams = filterDiscoverTeams(discoverTeams);

  return (
    <MainLayout>
      <div className="container py-8 px-4 md:px-8 ">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
              <p className="text-neutral-500 dark:text-neutral-400">
                Join forces with others to tackle challenges together
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
              />
              <Button onClick={() => setShowCreateTeamModal(true)}>
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
                Create Team
              </Button>
            </div>
          </div>

          {/* Teams Tabs */}
          <Tabs defaultValue="my-teams" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="my-teams">My Teams</TabsTrigger>
              <TabsTrigger value="invites">Invites {teamInvites.length > 0 && `(${teamInvites.length})`}</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
            </TabsList>
            
            {/* My Teams Tab */}
            <TabsContent value="my-teams">
              {filteredMyTeams.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredMyTeams.map((team) => (
                    <Link href={`/teams/${team.id}`} key={team.id}>
                      <Card className="h-full transition-all hover:shadow-md">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600">
                                <span className="text-xl">{team.avatar}</span>
                              </div>
                              <CardTitle>{team.name}</CardTitle>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-600">
                              {team.role}
                            </span>
                          </div>
                          <CardDescription>{team.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-2xl font-bold">{team.members}</p>
                              <p className="text-xs text-neutral-500">Members</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">{team.activeChallenges}</p>
                              <p className="text-xs text-neutral-500">Active</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">{team.completedChallenges}</p>
                              <p className="text-xs text-neutral-500">Completed</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View Team</Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
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
                  <h3 className="text-xl font-semibold mb-2">No teams found</h3>
                  <p className="text-neutral-500 max-w-md mx-auto mb-6">
                    You haven't joined any teams yet. Create a new team or discover existing ones to get started.
                  </p>
                  <Button onClick={() => setShowCreateTeamModal(true)}>Create a Team</Button>
                </div>
              )}
            </TabsContent>
            
            {/* Invites Tab */}
            <TabsContent value="invites">
              {filteredTeamInvites.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredTeamInvites.map((team) => (
                    <Card key={team.id} className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600">
                            <span className="text-xl">{team.avatar}</span>
                          </div>
                          <CardTitle>{team.name}</CardTitle>
                        </div>
                        <CardDescription>{team.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <p className="text-sm text-neutral-500">
                            Invited by <span className="font-medium text-neutral-900 dark:text-neutral-100">{team.invitedBy}</span>
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold">{team.members}</p>
                            <p className="text-xs text-neutral-500">Members</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{team.activeChallenges}</p>
                            <p className="text-xs text-neutral-500">Active Challenges</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button variant="outline" className="w-full">Decline</Button>
                        <Button className="w-full">Accept</Button>
                      </CardFooter>
                    </Card>
                  ))}
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
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No invites</h3>
                  <p className="text-neutral-500 max-w-md mx-auto">
                    You don't have any team invites at the moment. Check back later or discover teams to join.
                  </p>
                </div>
              )}
            </TabsContent>
            
            {/* Discover Tab */}
            <TabsContent value="discover">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredDiscoverTeams.map((team) => (
                  <Card key={team.id} className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600">
                          <span className="text-xl">{team.avatar}</span>
                        </div>
                        <CardTitle>{team.name}</CardTitle>
                      </div>
                      <CardDescription>{team.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold">{team.members}</p>
                          <p className="text-xs text-neutral-500">Members</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{team.activeChallenges}</p>
                          <p className="text-xs text-neutral-500">Active</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{team.completedChallenges}</p>
                          <p className="text-xs text-neutral-500">Completed</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Request to Join</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Create Team Modal (simplified, would use a proper modal component in a real app) */}
      {showCreateTeamModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create a New Team</CardTitle>
              <CardDescription>
                Form a team to tackle challenges together and motivate each other
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="team-name" className="text-sm font-medium">
                    Team Name
                  </label>
                  <Input id="team-name" placeholder="Enter team name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="team-description" className="text-sm font-medium">
                    Description
                  </label>
                  <Input id="team-description" placeholder="What is your team about?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="team-privacy" className="text-sm font-medium">
                    Privacy
                  </label>
                  <select 
                    id="team-privacy"
                    className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary"
                  >
                    <option value="public">Public - Anyone can find and request to join</option>
                    <option value="private">Private - Only invited members can join</option>
                  </select>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowCreateTeamModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowCreateTeamModal(false)}>
                Create Team
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </MainLayout>
  );
} 