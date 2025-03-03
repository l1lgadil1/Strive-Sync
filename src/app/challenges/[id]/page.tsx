import { AppLayout } from '@/components/layout/app-layout';
import { ChallengeDetailContent } from '@/components/features/challenges/challenge-detail-content';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: `Challenge Details - StriveSync`,
    description: 'View challenge details and track your progress',
  };
};

export default function ChallengeDetailPage({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <ChallengeDetailContent challengeId={params.id} />
    </AppLayout>
  );
} 