import React from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col justify-center items-center py-24 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-12 max-w-lg w-full text-center border border-gray-100">
          <h1 className="text-5xl font-bold text-emerald-700 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">You are not on the right page</h2>
          <p className="text-gray-600 mb-8">The page you are looking for does not exist or you have entered a wrong route.<br/>Go to the home page to continue exploring Ghibli AI.</p>
          <Link href="/" className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow hover:bg-emerald-700 transition-all duration-200">
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

