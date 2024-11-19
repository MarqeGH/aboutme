import Image from 'next/image';

export default function Header()
{
    return (
    <>
        <Image className="headerimg" src="/icon.png" alt="Icon" width={50} height={50} />
        <h1>
            Welcome to my skills page
        </h1>
    </>
    )
}