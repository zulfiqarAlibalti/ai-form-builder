"use client";
// import { Button } from '@/components/ui/button'
import { Button } from "@/components/ui/moving-border";
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  return !path.includes('aiform') && (
    <div className='p-5 border-b shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className='text-xl font-bold'>  <Link href={'/'}>AI-Form Builder</Link></span> {/* Add title here */}
        </div>
        {isSignedIn ? (
          <div className='flex items-center gap-5'>
            <Link href={'/dashboard'}>
            <Button duration={Math.floor(Math.random() * 1000) + 1000}
            borderRadius="1.95rem" style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              
              
              // add this border radius to make it more rounded so that the moving border is more realistic
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="block w-full rounded px-7 py-3 text-bold font-medium text-gray-700 shadow hover:text-purple-700 focus:outline-none focus:ring active:text-purple-500 sm:w-auto"
            href="">
          Dashboard
        </Button>
        
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button duration={Math.floor(Math.random() * 1000) + 1000}
            borderRadius="1.95rem" style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              background: "rgb(2,0,36)",
              backgroundColor:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(15,70,179,1) 35%)",
              // add this border radius to make it more rounded so that the moving border is more realistic
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="block w-full rounded  px-8 py-3 text-sm font-medium text-white shadow">
          Get Started
        </Button>

            {/* <Button>Get Started</Button> */}
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default Header;
