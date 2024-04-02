import useTheme from '@/src/context/themeContext/useTheme';
import React from 'react'
import Header from '.';
import Link from 'next/link';

const PagesHeader = () => {
    	const { colorTheme } = useTheme();
  return (
    <div
      className={`flex items-center justify-between sticky top-0 z-50 p-6 h-[73px] ${colorTheme.bgColor} ${colorTheme.border}`}
    >
      <div className="pl-6 py-5">
        <Link href="/dashboard">
          <p className="text-2xl font-bold text-green-500">SpeckCheck</p>
        </Link>
      </div>
      <Header />
    </div>
  );
}

export default PagesHeader