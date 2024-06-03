"use client"
import Confetti from 'react-confetti'

export default function Page() {
  const { innerWidth: width, innerHeight: height } = window;

  return (
    <main className=' h-screen w-screen overflow-hidden'>
      <Confetti
        width={width}
        height={height}
      />
    </main>
  )
}