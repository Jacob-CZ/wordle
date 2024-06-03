"use client"

import Square from "@/components/square";
import { useRouter } from "next/navigation";
import { KeyboardEvent, ChangeEvent, ChangeEventHandler, EventHandler, useState, useRef, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
const secretWord = "HELLO"
export default function Home() {
  const [word, setWord] = useState<Array<Array<string>>>(Array.from({length:6}).map(() => (["","","","",""])))
  const [letterStatus, setLetterStatus] = useState<Array<Array<"none" | "correct" | "contains" | "incorrect">>>(Array.from({length:6}).map(() => (["none","none","none","none","none"])))
  const [column, setColumn] = useState(0)
  const [row, setRow] = useState(0)
  const router = useRouter()
  const submit = () => {
    fetch("/api/validate_word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({word: word[row]})
    }).then(res => res.json()).then(data => {
      if (data.word.every((l: "none" | "correct" | "contains" | "incorrect") => l === "correct")) {
        router.push("/correct")
      }
      setLetterStatus(letterStatus.map((l, i) => i === row ? data.word : l))
    })
    setRow(row + 1)
    setColumn(0)
  }
  return (
    <main className="flex flex-col items-center justify-center h-screen" >
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
        style={{ fontSize: '10em', display: 'inline-block', fontFamily: 'monospace' }}
        repeat={Infinity}
      />
      <div className=" grid grid-cols-5 grid-rows-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          Array.from({ length: 5 }).map((_, j) => (
          <Square state={letterStatus[i][j]} word={word} setWord={setWord} setColumn={setColumn} key={i*5 + j} row={i} column={j} currentRow={row} currentColumn={column} submit={submit} />
          ))
        ))}
      </div>
    </main>
  );
}
