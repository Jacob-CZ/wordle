import { NextRequest, NextResponse } from "next/server";
let secretWord = "DELTA"
import words from "@/public/words.json"
export async function POST(request: NextRequest) {
    const cookies = request.cookies
    const finished = cookies.get("Today")
    if (finished?.value === "true") {
        return NextResponse.json({message: "You have already played today"})
    }
    const body = await request.json()
    const correctnessArray : Array<"none" | "correct" | "contains" | "incorrect"> = ["none","none","none","none","none"]
    const word: string[] = body.word
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
