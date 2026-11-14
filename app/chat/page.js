import { Suspense } from 'react';
import RedHeartReader from '../../components/redheart/RedHeartReader';

export const metadata = {
  title: 'The 5 Companions Experience | PeopleReadingSeries',
  description: 'Consult directly with all 5 elite PeopleReadingSeries strategists.',
};

export default function ChatIndexPage() {
  return (
    <main className="min-h-screen bg-black flex justify-center items-center">
      <Suspense fallback={<div className="text-white p-8">Loading Experience...</div>}>
        <RedHeartReader />
      </Suspense>
    </main>
  );
}
