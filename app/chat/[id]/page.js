import PersonaChatExperience from '../../../components/redheart/PersonaChatExperience';
import { getPersonaConfig } from '../../../lib/personaChatConfigs';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const persona = getPersonaConfig(id);

  return {
    title: `${persona.name} | PeopleReadingSeries Experience`,
    description: `Consult directly with ${persona.name} (${persona.roleTitle}). Real-time psychological diagnostics, voice guidance, and actionable tactics.`,
  };
}

export default async function ChatPersonaPage({ params }) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-black flex justify-center items-center">
      <PersonaChatExperience personaId={id} />
    </main>
  );
}
