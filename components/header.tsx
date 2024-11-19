import Image from 'next/image';
import Link from 'next/link';

export default function Header()
{
    return (
    <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
            <Image className="headerimg" src="/icon.png" alt="Icon" width={50} height={50} />
        </div>
        <nav className="flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/about">About me</Link>
            <Link href="/visitors">Visitors</Link>
            <Link href="/colors" className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 font-bold">
                Colors?
            </Link>
        </nav>
    </div>
    )
}