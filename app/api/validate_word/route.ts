import { NextRequest, NextResponse } from "next/server";
import words from "@/public/words.json"
let secretWord = process.env.PRODUCTION === "true" ? words[Math.floor(Math.random() * words.length)] : 'DELTA'
export async function POST(request: NextRequest) {
    console.log(process.env.PRODUCTION)
    console.log(secretWord)
    const cookies = request.cookies
    const finished = cookies.get("Today")
    if (finished?.value === "true") {
        return NextResponse.json({message: "You have already played today"})
    }
    const body = await request.json()
    const correctnessArray : Array<"none" | "correct" | "contains" | "incorrect"> = ["none","none","none","none","none"]
    const word: string[] = body.word
    const time: number = body.time
    const elapsed = new Date(time)
    console.log(elapsed.getMinutes() + ":" + elapsed.getSeconds() + ":" + elapsed.getMilliseconds())    
    if (word.length !== 5) {
        return NextResponse.json({message: "Word must be 5 characters long"})
    }
    if (word.some(l => l.length !== 1)) {
        return NextResponse.json({message: "Each character must be a single letter"})
    }
    if(!words.includes(word.join("").toLowerCase())){
        console.log(word.join("")) 
        return NextResponse.json({message: "Word is not in the dictionary"})
    }
    word.forEach((w, i) => {
        if (secretWord[i] === w) {
            correctnessArray[i] = "correct"
        } else if (secretWord.includes(w)) {
            correctnessArray[i] = "contains"
        } else {
            correctnessArray[i] = "incorrect"
        }
    })

    return NextResponse.json({ word: correctnessArray})
}

export  function GET() {
    secretWord = words[Math.floor(Math.random() * words.length)]
  return NextResponse.json(words);
}
