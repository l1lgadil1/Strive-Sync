import React from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ChallengesPage() {
  // Mock data for challenges
  const challenges = [
    {
      id: 1,
      title: 'Morning Workout Challenge',
      description: 'Start your day with a 30-minute workout for 30 days.',
      category: 'Fitness',
      difficulty: 'Medium',
      duration: '30 days',
      participants: 128,
      image: '/challenge-fitness.svg',
    },
    {
      id: 2,
      title: '30-Day Reading Challenge',
      description: 'Read at least 20 pages every day for 30 days.',
      category: 'Education',
      difficulty: 'Easy',
      duration: '30 days',
      participants: 256,
      image: '/challenge-reading.svg',
    },
    {
      id: 3,
      title: 'Meditation Marathon',
      description: 'Meditate for at least 10 minutes daily for 21 days.',
      category: 'Wellness',
      difficulty: 'Easy',
      duration: '21 days',
      participants: 192,
      image: '/challenge-meditation.svg',
    },
    {
      id: 4,
      title: 'Code 100 Days',
      description: 'Code for at least 1 hour every day for 100 days.',
      category: 'Productivity',
      difficulty: 'Hard',
      duration: '100 days',
      participants: 64,
      image: '/challenge-coding.svg',
    },
    {
      id: 5,
      title: 'Healthy Eating',
      description: 'Eat clean and avoid processed foods for 14 days.',
      category: 'Nutrition',
      difficulty: 'Medium',
      duration: '14 days',
      participants: 320,
      image: '/challenge-nutrition.svg',
    },
    {
      id: 6,
      title: 'Digital Detox',
      description: 'Limit screen time to essential use only for 7 days.',
      category: 'Wellness',
      difficulty: 'Hard',
      duration: '7 days',
      participants: 96,
      image: '/challenge-detox.svg',
    },
  ];

  return (
    <MainLayout>
      <div className="container py-8 px-4">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Challenges</h1>
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

          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <Input placeholder="Search challenges..." />
            </div>
            <div>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="wellness">Wellness</SelectItem>
                  <SelectItem value="productivity">Productivity</SelectItem>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Challenges Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="overflow-hidden">
                <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-neutral-400"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="M8 18v-1" />
                    <path d="M16 18v-3" />
                  </svg>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-primary">{challenge.category}</div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{challenge.difficulty}</div>
                  </div>
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
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
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                      <span>{challenge.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
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
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span>{challenge.participants} participants</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/challenges/${challenge.id}`} className="w-full">
                    <Button variant="outline" className="w-full">View Challenge</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 