"use client"

import { KeyboardEvent, ChangeEvent, ChangeEventHandler, EventHandler, useState, useRef, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
export default function Home() {
  const [word, setWord] = useState("")
  const [cursor, setCursor] = useState(0)
  const [currentRow, setCurrentRow] = useState(0)
  const refs = Array.from({ length: 30 }, () => useRef<HTMLInputElement | null>(null)); // Initialize refs with null values
  useEffect(() => {
    fetch("/api/get_todays_word", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setWord(data.word)
      })
  })
  const handleSubmit = (row: number) => {
    for (let i = 5 * row; i < 5 * (row + 1); i++) {
      console.log(i)
      console.log(refs[i].current?.value, word[i % 5])
      if (refs[i].current?.value == word[i % 5]) {
        console.log("Correct")
        refs[i].current!.classList.add("bg-green-500")
      } else if (word.includes(refs[i].current?.value as string)) {
        console.log("Empty")
        refs[i].current!.classList.add("bg-yellow-500")
      }
      else if (refs[i].current?.value !== word[i % 5]) {
        console.log("Incorrect")
        refs[i].current!.classList.add("bg-red-500")
      }

    }

  }
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    refs[cursor].current!.value = refs[cursor].current?.value?.toUpperCase() as string
    if (e.key === "Enter" && cursor % 5 === 4) {
      setCurrentRow(currentRow + 1)
      setCursor(5 * (currentRow + 1))
      refs[5 * (currentRow + 1)].current?.focus()
      handleSubmit(currentRow)
      return
    }
    if (!refs[cursor].current) return
    if (e.key === "Backspace") {
      if (cursor - 1 < 5 * currentRow) return
      refs[cursor - 1].current?.focus() // Use optional chaining to access current property
      setCursor((cursor - 1))
    } else if (!e.key.match(/^[a-zA-Z]$/)) {
      return
    }

    else {
      if (cursor + 1 >= 5 * (currentRow + 1)) {
        return
      }
      refs[cursor + 1].current?.focus()

      setCursor(cursor + 1)
    }
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.match(/^[a-zA-Z]$/) && refs[cursor].current?.value !== "") {
      refs[cursor].current!.value = e.key;
      e.preventDefault();
      e.stopPropagation();
    }
  }
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.value = e.target.value.toUpperCase()
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          'Wordle',
          1000, // wait 1s before replacing "Mice" with "Hamsters"
          'Delta Wordle',
          1000,
        ]}
        wrapper="span"
        speed={20}
        style={{ fontSize: '10em', display: 'inline-block', fontFamily: 'monospace'}}
        repeat={Infinity}
      />
      <div className=" grid grid-cols-5 grid-rows-6 gap-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <input onKeyDown={handleKeyDown} onChange={onChange} onFocus={() => setCursor(i)} ref={refs[i]} onKeyUp={(e) => handleKeyUp(e)} key={i} className=" relative bg-neutral-800 border border-neutral-600 outline-none focus:border-white transition-all w-24 h-24 text-[5rem] text-center " type="text" />
        ))}
      </div>
    </main>
  );
}
