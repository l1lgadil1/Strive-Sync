"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  difficulty: z.string().min(1, { message: "Please select a difficulty level" }),
  duration: z.string().min(1, { message: "Please select a duration" }),
  rules: z.string().min(20, { message: "Rules must be at least 20 characters" }),
  startDate: z.string().min(1, { message: "Please select a start date" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewChallengePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      difficulty: '',
      duration: '',
      rules: '',
      startDate: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would be an API call
      console.log('Challenge data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to challenges page
      router.push('/challenges');
    } catch (error) {
      console.error('Error creating challenge:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container py-8 px-4">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Challenge</h1>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">
              Create a new challenge for yourself or to share with others
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="rules">Rules & Settings</TabsTrigger>
              </TabsList>
              
              {/* Basic Info Tab */}
              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Enter the basic details of your challenge
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Challenge Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter a title for your challenge"
                        {...register('title')}
                      />
                      {errors.title && (
                        <p className="text-sm text-red-500">{errors.title.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Short Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Briefly describe your challenge"
                        className="min-h-[100px]"
                        {...register('description')}
                      />
                      {errors.description && (
                        <p className="text-sm text-red-500">{errors.description.message}</p>
                      )}
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          onValueChange={(value) => setValue('category', value)}
                          defaultValue=""
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fitness">Fitness</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="wellness">Wellness</SelectItem>
                            <SelectItem value="productivity">Productivity</SelectItem>
                            <SelectItem value="nutrition">Nutrition</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p className="text-sm text-red-500">{errors.category.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select 
                          onValueChange={(value) => setValue('difficulty', value)}
                          defaultValue=""
                        >
                          <SelectTrigger id="difficulty">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.difficulty && (
                          <p className="text-sm text-red-500">{errors.difficulty.message}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button type="button" onClick={() => document.getElementById('details-tab')?.click()}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Details Tab */}
              <TabsContent value="details" id="details-tab">
                <Card>
                  <CardHeader>
                    <CardTitle>Challenge Details</CardTitle>
                    <CardDescription>
                      Provide more details about your challenge
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select 
                          onValueChange={(value) => setValue('duration', value)}
                          defaultValue=""
                        >
                          <SelectTrigger id="duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="21">21 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.duration && (
                          <p className="text-sm text-red-500">{errors.duration.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          {...register('startDate')}
                        />
                        {errors.startDate && (
                          <p className="text-sm text-red-500">{errors.startDate.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">Challenge Image (Optional)</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-24 w-24 rounded-md bg-neutral-100 flex items-center justify-center dark:bg-neutral-800">
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
                            className="h-8 w-8 text-neutral-500"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        </div>
                        <Button type="button" variant="outline">
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => document.getElementById('basic-tab')?.click()}>
                      Previous
                    </Button>
                    <Button type="button" onClick={() => document.getElementById('rules-tab')?.click()}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Rules Tab */}
              <TabsContent value="rules" id="rules-tab">
                <Card>
                  <CardHeader>
                    <CardTitle>Rules & Settings</CardTitle>
                    <CardDescription>
                      Define the rules and settings for your challenge
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="rules">Challenge Rules</Label>
                      <Textarea
                        id="rules"
                        placeholder="List the rules for your challenge (one per line)"
                        className="min-h-[150px]"
                        {...register('rules')}
                      />
                      <p className="text-xs text-neutral-500">
                        Enter each rule on a new line. Be clear and specific about what participants need to do.
                      </p>
                      {errors.rules && (
                        <p className="text-sm text-red-500">{errors.rules.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Challenge Type</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="individual"
                          name="challengeType"
                          value="individual"
                          defaultChecked
                          className="h-4 w-4"
                        />
                        <Label htmlFor="individual" className="text-sm font-normal">Individual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="team"
                          name="challengeType"
                          value="team"
                          className="h-4 w-4"
                        />
                        <Label htmlFor="team" className="text-sm font-normal">Team-based</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Privacy Settings</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="public"
                          name="privacy"
                          value="public"
                          defaultChecked
                          className="h-4 w-4"
                        />
                        <Label htmlFor="public" className="text-sm font-normal">Public (Anyone can join)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="private"
                          name="privacy"
                          value="private"
                          className="h-4 w-4"
                        />
                        <Label htmlFor="private" className="text-sm font-normal">Private (Invitation only)</Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => document.getElementById('details-tab')?.click()}>
                      Previous
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Creating...' : 'Create Challenge'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </div>
    </MainLayout>
  );
} 