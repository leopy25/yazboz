'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-center text-3xl font-bold my-8 text-blue-600">Arşiv Uygulaması</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0">
        <Link href="/r-codes" style={{ marginRight: '5cm' }} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 w-full sm:w-auto text-center">
          R-kodlar
        </Link>
        <Link href="/f-codes" style={{ marginRight: '5cm' }} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 w-full sm:w-auto text-center">
          F-kodlar
        </Link>
        <Link href="/keywords" style={{ marginRight: '5cm' }} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 w-full sm:w-auto text-center">
          Anahtar Kelimeler
        </Link>
        <Link href="/dashboard" style={{ marginRight: '5cm' }} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 w-full sm:w-auto text-center">
          Pano
        </Link>
        <Link href="/other" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 w-full sm:w-auto text-center">
          Diğer
        </Link>
      </div>
    </div>
  );
}