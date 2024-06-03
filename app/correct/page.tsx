"use client"
import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default () => {
  const { width, height } = useWindowSize()
  return (
    <main className=' h-screen w-screen overflow-hidden'>
    <Confetti
      width={1920}
      height={900}
    />
    </main>
  )
}