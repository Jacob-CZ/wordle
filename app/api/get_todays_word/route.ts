import words from "@/public/words.json"
import { NextResponse } from "next/server";

let word = "DEFAU"
export  function GET() {
    word = words[Math.floor(Math.random() * words.length)]
  return NextResponse.json(words);
}

export function POST() {
  return NextResponse.json({ word:word.toUpperCase() });
}