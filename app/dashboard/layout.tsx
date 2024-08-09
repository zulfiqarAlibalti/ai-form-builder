"use client";
import { SignedIn } from '@clerk/clerk-react';
import React, { ReactNode } from 'react';
import SideNav from './_components/SideNav';

interface DashboardLayoutProps {
    children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SignedIn>
        <div className='md:w-64 fixed'>
            <SideNav />
        </div>
        <div className='md:ml-64'>
            {children}
        </div>
    </SignedIn>
  );
}

export default DashboardLayout;
