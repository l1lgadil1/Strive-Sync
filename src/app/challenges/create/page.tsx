import { AppLayout } from '@/components/layout/app-layout';
import { CreateChallengeContent } from '@/components/features/challenges/create-challenge-content';

export const metadata = {
  title: 'Create Challenge - StriveSync',
  description: 'Create a new self-improvement challenge',
};

export default function CreateChallengePage() {
  return (
    <AppLayout>
      <CreateChallengeContent />
    </AppLayout>
  );
} 