import { redirect } from 'next/navigation';

export default function AppPage() {
  redirect('/home');

  return <div>Redirecting...</div>;
}