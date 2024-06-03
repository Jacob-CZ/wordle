"use client"
import React from 'react'
import Confetti from 'react-confetti'

export default function Page() {
  return (
    <main className=' h-screen w-screen overflow-hidden'>
    <Confetti
      width={1920}
      height={900}
    />
    </main>
  )
}