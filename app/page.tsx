'use client';
import Link from 'next/link';
import Header from '@/components/header';

export default function Home() {

  if (status === 'loading') {
    return <div>Loading...</div>;
  }


  return (
    <div className="p-8">
      <Header />
      <Link href="/about">About me</Link>
      <br />
      <Link href="/visitors">Write me a visitor&apos;s message</Link>
      <br />
      <Link href="/colors" className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 font-bold">Colors?</Link>
    </div>
  );
}