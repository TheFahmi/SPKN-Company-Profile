'use client';

import ErrorPage from './(error-pages)/error/page';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage />;
} 