import { AppLayout } from '@/components/layout/app-layout';
import { MyChallengesContent } from '@/components/features/challenges/my-challenges-content';

export const metadata = {
  title: 'My Challenges - StriveSync',
  description: 'View and manage your active challenges',
};

export default function MyChallengesPage() {
  return (
    <AppLayout>
      <MyChallengesContent />
    </AppLayout>
  );
} 