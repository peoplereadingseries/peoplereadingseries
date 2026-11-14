import RedHeartReader from '../../components/redheart/RedHeartReader';

export const metadata = {
  title: 'Siya | Heart Reader',
  description: 'Understand the unspoken emotions with Siya, the intuitive mentor that reads hearts.',
};

export default function SiyaPage() {
  return (
    <main className="min-h-screen bg-black flex justify-center items-center">
      <RedHeartReader />
    </main>
  );
}



