"use client"
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import {Model} from "@/components/Champions"
import { OrbitControls } from '@react-three/drei';
import Cookies from 'js-cookie';
export default function Page() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // Calculate the time until the end of the day
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const expiresIn = (endOfDay.getTime() - now.getTime()) / 1000; // Convert to seconds
  
    // Set the cookie to expire at the end of the day
    Cookies.set('Today', 'true', { expires: expiresIn / (60 * 60 * 24) }); // Convert seconds to days for js-cookie
  
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
      <Canvas camera={{position:[0,8,0]}}>
        <OrbitControls/>
        <ambientLight />
        <pointLight intensity={1000} position={[10,10,10]} />
        <Model/>
      </Canvas>
    </main>
  );
}