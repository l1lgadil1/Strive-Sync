import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface ChallengePageProps {
  params: {
    id: string;
  };
}

export default function ChallengePage({ params }: ChallengePageProps) {
  const id = parseInt(params.id);

  // Mock data for challenges
  const challenges = [
    {
      id: 1,
      title: 'Morning Workout Challenge',
      description: 'Start your day with a 30-minute workout for 30 days.',
      longDescription: 'This challenge is designed to help you build a consistent morning workout routine. Each day, you\'ll complete a 30-minute workout session within the first hour of waking up. The workouts can include cardio, strength training, yoga, or any physical activity of your choice. The goal is to establish a healthy habit that energizes you for the day ahead.',
      category: 'Fitness',
      difficulty: 'Medium',
      duration: '30 days',
      participants: 128,
      startDate: '2023-06-01',
      endDate: '2023-06-30',
      rules: [
        'Complete a 30-minute workout every morning',
        'Workout must be done within 1 hour of waking up',
        'Log your workout type and duration daily',
        'Take a progress photo once a week',
        'Share your experience with the community at least once a week'
      ],
      progress: 40,
      leaderboard: [
        { rank: 1, name: 'Alex Johnson', points: 450, avatar: '/avatars/avatar-1.png' },
        { rank: 2, name: 'Sarah Williams', points: 425, avatar: '/avatars/avatar-2.png' },
        { rank: 3, name: 'Michael Brown', points: 410, avatar: '/avatars/avatar-3.png' },
        { rank: 4, name: 'Emily Davis', points: 395, avatar: '/avatars/avatar-4.png' },
        { rank: 5, name: 'David Miller', points: 380, avatar: '/avatars/avatar-5.png' },
      ],
      discussions: [
        { id: 1, author: 'Alex Johnson', content: 'I\'ve been doing HIIT workouts for this challenge and it\'s been amazing!', date: '2 days ago', likes: 12, replies: 3 },
        { id: 2, author: 'Sarah Williams', content: 'Does anyone have recommendations for good workout videos to follow?', date: '3 days ago', likes: 8, replies: 5 },
        { id: 3, author: 'Michael Brown', content: 'I\'ve found that doing yoga in the morning has improved my focus throughout the day.', date: '5 days ago', likes: 15, replies: 2 },
      ],
      image: '/challenge-fitness.svg',
    },
    {
      id: 2,
      title: '30-Day Reading Challenge',
      description: 'Read at least 20 pages every day for 30 days.',
      longDescription: 'This challenge encourages you to develop a daily reading habit. By committing to read at least 20 pages every day, you\'ll make steady progress through books while building a sustainable routine. Whether you prefer fiction, non-fiction, or a mix of genres, this challenge will help you prioritize reading in your daily life.',
      category: 'Education',
      difficulty: 'Easy',
      duration: '30 days',
      participants: 256,
      startDate: '2023-06-01',
      endDate: '2023-06-30',
      rules: [
        'Read a minimum of 20 pages daily',
        'Log the book title and pages read each day',
        'Share your favorite quote or insight once a week',
        'Complete at least one book during the challenge',
        'Participate in weekly discussion threads'
      ],
      progress: 65,
      leaderboard: [
        { rank: 1, name: 'Emily Davis', points: 480, avatar: '/avatars/avatar-4.png' },
        { rank: 2, name: 'David Miller', points: 465, avatar: '/avatars/avatar-5.png' },
        { rank: 3, name: 'Alex Johnson', points: 430, avatar: '/avatars/avatar-1.png' },
        { rank: 4, name: 'Sarah Williams', points: 410, avatar: '/avatars/avatar-2.png' },
        { rank: 5, name: 'Michael Brown', points: 395, avatar: '/avatars/avatar-3.png' },
      ],
      discussions: [
        { id: 1, author: 'Emily Davis', content: 'I just finished "Atomic Habits" and it\'s been life-changing!', date: '1 day ago', likes: 18, replies: 7 },
        { id: 2, author: 'David Miller', content: 'Anyone reading any good science fiction? Looking for recommendations.', date: '4 days ago', likes: 10, replies: 12 },
        { id: 3, author: 'Sarah Williams', content: 'I\'ve been reading before bed instead of scrolling on my phone, and I\'m sleeping much better.', date: '6 days ago', likes: 22, replies: 5 },
      ],
      image: '/challenge-reading.svg',
    },
    // Add more challenges as needed
  ];

  const challenge = challenges.find(c => c.id === id);

  if (!challenge) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container py-8 px-4">
        <div className="flex flex-col gap-8">
          {/* Header with navigation */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <Link href="/challenges" className="hover:text-neutral-900 dark:hover:text-neutral-50">
              Challenges
            </Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-neutral-50">{challenge.title}</span>
          </div>

          {/* Challenge Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {challenge.category}
                </span>
                <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium dark:bg-neutral-800">
                  {challenge.difficulty}
                </span>
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">{challenge.title}</h1>
              <p className="mt-2 text-neutral-500 dark:text-neutral-400">{challenge.description}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button>
                Join Challenge
              </Button>
              <Button variant="outline">
                Share
              </Button>
            </div>
          </div>

          {/* Challenge Content */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="progress">My Progress</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>About this Challenge</CardTitle>
                      <CardDescription>Learn more about the challenge and its rules</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium">Description</h3>
                        <p className="mt-2 text-neutral-500 dark:text-neutral-400">{challenge.longDescription}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Rules</h3>
                        <ul className="mt-2 space-y-2">
                          {challenge.rules.map((rule, index) => (
                            <li key={index} className="flex items-start gap-2">
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
                                className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                              >
                                <path d="m5 12 5 5L20 7" />
                              </svg>
                              <span className="text-neutral-500 dark:text-neutral-400">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium">Duration</h3>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
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
                            <span>Start: {challenge.startDate}</span>
                          </div>
                          <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
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
                            <span>End: {challenge.endDate}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="discussions" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Discussions</CardTitle>
                      <CardDescription>Join the conversation with other participants</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {challenge.discussions.map((discussion) => (
                          <div key={discussion.id} className="border-b border-neutral-100 pb-6 last:border-0 dark:border-neutral-800">
                            <div className="flex items-start gap-4">
                              <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{discussion.author}</h4>
                                  <span className="text-xs text-neutral-500 dark:text-neutral-400">{discussion.date}</span>
                                </div>
                                <p className="mt-2 text-neutral-500 dark:text-neutral-400">{discussion.content}</p>
                                <div className="mt-4 flex items-center gap-4">
                                  <button className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
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
                                      <path d="M7 10v12" />
                                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                                    </svg>
                                    <span>{discussion.likes} Likes</span>
                                  </button>
                                  <button className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
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
                                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    <span>{discussion.replies} Replies</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="progress" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Progress</CardTitle>
                      <CardDescription>Track your progress in this challenge</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Overall Progress</h3>
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">{challenge.progress}%</span>
                        </div>
                        <Progress value={challenge.progress} className="mt-2" />
                      </div>
                      <div>
                        <h3 className="font-medium">Daily Check-ins</h3>
                        <div className="mt-2 grid grid-cols-7 gap-2">
                          {Array.from({ length: 30 }).map((_, index) => (
                            <div
                              key={index}
                              className={`flex h-10 w-10 items-center justify-center rounded-md text-xs ${
                                index < challenge.progress / 3.33
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
                              }`}
                            >
                              {index + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">Log Today's Progress</h3>
                        <div className="mt-2 flex gap-2">
                          <Button>Mark as Complete</Button>
                          <Button variant="outline">Add Notes</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Participants</span>
                    <span className="font-medium">{challenge.participants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Duration</span>
                    <span className="font-medium">{challenge.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Difficulty</span>
                    <span className="font-medium">{challenge.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">Category</span>
                    <span className="font-medium">{challenge.category}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Leaderboard</CardTitle>
                  <CardDescription>Top performers in this challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {challenge.leaderboard.map((leader) => (
                      <div key={leader.rank} className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium dark:bg-neutral-800">
                          {leader.rank}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{leader.name}</p>
                        </div>
                        <div className="text-sm font-medium">{leader.points}</div>
                      </div>
                    ))}
                    <div className="pt-2">
                      <Button variant="outline" className="w-full">View Full Leaderboard</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 