"use client"
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import Model from "@/components/Drvotka_uwu"
import { OrbitControls } from '@react-three/drei';
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
      <Canvas>
        <OrbitControls/>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model/>
      </Canvas>
    </main>
  );
}