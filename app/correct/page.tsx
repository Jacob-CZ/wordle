"use client"
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function Page() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className='h-screen w-screen overflow-hidden'>
      <Confetti
        width={width}
        height={height}
      />
    </main>
  );
}