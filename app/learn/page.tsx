import { Suspense } from 'react';
import LearnClient from './LearnClient';

export default function LearnPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LearnClient />
    </Suspense>
  );
}
