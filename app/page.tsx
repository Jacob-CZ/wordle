"use client"

import Square from "@/components/square";
import Warn from "@/components/warn";
import Cookies, { set } from "js-cookie";
import { useRouter } from "next/navigation";
import { KeyboardEvent, ChangeEvent, ChangeEventHandler, EventHandler, useState, useRef, useEffect, use } from "react";
import { TypeAnimation } from "react-type-animation";
const secretWord = "HELLO"
export default function Home() {
  const [word, setWord] = useState<Array<Array<string>>>(Array.from({length:6}).map(() => (["","","","",""])))
  const [letterStatus, setLetterStatus] = useState<Array<Array<"none" | "correct" | "contains" | "incorrect">>>(Array.from({length:6}).map(() => (["none","none","none","none","none"])))
  const [column, setColumn] = useState(0)
  const [row, setRow] = useState(0)
  const [finished, setFinished] = useState(true)
  const [shake, setShake] = useState(-1)
  const router = useRouter()
  useEffect(() => {
    if (Cookies.get('Today') === 'true') {
      setFinished(true)
    }else{
      setFinished(false)
    }
  },[])
  const submit = () => {
    console.log(word)
    if (finished) {
      return;
    }
    fetch("/api/validate_word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({word: word[row]})
    }).then(res => res.json()).then(data => {
      if (!data.word){
        setShake(row)
        setColumn(0)
        setWord(word.map((l, i) => i === row ? ["","","","",""] : l))
        return 
      }
      if (data.word.every((l: "none" | "correct" | "contains" | "incorrect") => l === "correct")) {
        router.push("/correct")
      }
      console.log(data.word)
      setLetterStatus(letterStatus.map((l, i) => i === row ? data.word : l))
      setRow(row + 1)
      setColumn(0)
      if (row === 5) {
        setFinished(true)
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        const expiresIn = (endOfDay.getTime() - now.getTime()) / 1000; // Convert to seconds
      
        // Set the cookie to expire at the end of the day
        Cookies.set('Today', 'true', { expires: expiresIn / (60 * 60 * 24) }); // Convert seconds to days for js-cookie
        window.location.reload()
      }
    })

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
        className="barcode text-9xl text-red-600 mb-5"
        repeat={Infinity}
      />
      <div className=" grid grid-cols-5 grid-rows-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          Array.from({ length: 5 }).map((_, j) => (
          <Square shake={shake} setshake={setShake} state={letterStatus[i][j]} word={word} setWord={setWord} setColumn={setColumn} key={i*5 + j} row={i} column={j} currentRow={row} currentColumn={column} submit={submit} />
          ))
        ))}
      </div>
      {finished && <Warn />}
    </main>
  );
}
