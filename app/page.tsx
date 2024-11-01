import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div>
        <h1>Main page</h1>
        <Link href="/about">Go to about page</Link>
      </div>
    </main>
  );
}
