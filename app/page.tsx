'use client'
import Link from 'next/link';
export default function Home() {
  return (
      <div>
          <Link href="/news" className="border rounded-md p-2 mt-5 inline-block">See current news</Link>
      </div>
  );
}
