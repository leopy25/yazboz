'use client';

import React from 'react';

export default function Home() {
  return (
    <div className="container min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-center text-3xl font-bold my-8">Arşiv Uygulaması</h1>
      <div className="flex w-full px-8 justify-between items-center">
        <a href="/r-codes" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          R-kod Arşivi
        </a>
        <a href="/f-codes" className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
          F-kod Arşivi
        </a>
      </div>
    </div>
  );
}