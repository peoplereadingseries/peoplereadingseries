'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PersonaChatExperience, { PersonaChatExperienceProps } from './PersonaChatExperience';

function RedHeartReaderInner(props: PersonaChatExperienceProps) {
  const searchParams = useSearchParams();
  const queryPersona = searchParams?.get('persona') || undefined;
  const personaId = props.personaId || queryPersona || 'the-heart-reader';

  return <PersonaChatExperience {...props} personaId={personaId} />;
}

export default function RedHeartReader(props: PersonaChatExperienceProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Experience...</div>}>
      <RedHeartReaderInner {...props} />
    </Suspense>
  );
}

export { PersonaChatExperience };
