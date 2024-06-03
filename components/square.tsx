import { useEffect, useRef, KeyboardEvent, ChangeEvent, use } from "react"

export default function Square(props: { state: "none" | "correct" | "contains" | "incorrect",word: Array<Array<string>> ,column:number, row: number, currentRow : number, currentColumn:number, submit: () => void, setWord: (l: Array<Array<string>>) => void, setColumn: (c: number) => void}) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (props.column === props.currentColumn && props.row === props.currentRow) {
            inputRef.current?.focus()
        }
    }, [props.currentColumn, props.currentRow])
    useEffect(() => {
        if (props.state === "correct") {
            inputRef.current!.style.backgroundColor = "green"
        } else if (props.state === "incorrect") {
            inputRef.current!.style.backgroundColor = "red"
        } else if (props.state === "contains") {
            inputRef.current!.style.backgroundColor = "yellow"
        } else {
            inputRef.current!.style.backgroundColor = "transparent"
        }
    }, [props.state])
    const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 1) {
            e.target.value = e.target.value[0]
            inputRef.current?.focus()
        }
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key.length === 1 && props.currentColumn %5 !== 4 && e.key.match(/[a-z]/)) {
            props.setColumn(props.currentColumn + 1)
        }
        if (e.key === "Backspace" && props.currentColumn > 0 && props.currentColumn % 5 !== 0) {
            e.preventDefault()
            inputRef.current!.value = ""
            props.setColumn(props.currentColumn - 1)
        }
        if (e.key === "Enter" && props.currentColumn % 5 === 4 && inputRef.current!.value.length === 1) {
            e.preventDefault()
            props.submit()
        }
        if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            e.preventDefault();
            inputRef.current!.value = e.key.toUpperCase();
            let newWord = [...props.word]
            newWord[props.row][props.column] = e.key.toUpperCase()
            props.setWord(newWord)
        }
    }

    return (
        <input ref={inputRef} onKeyDown={handleKeyDown} onChange={handlechange}  className=" pointer-events-none relative bg-neutral-800 border border-neutral-600 outline-none focus:border-white transition-all w-24 h-24 text-[5rem] text-center " type="text" />
    )

}