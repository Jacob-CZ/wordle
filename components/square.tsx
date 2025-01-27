import { useEffect, useRef, KeyboardEvent, ChangeEvent, useState } from "react"
import { animate, motion, useAnimate, useMotionValue } from "framer-motion"
export default function Square(props: {
	state: "none" | "correct" | "contains" | "incorrect"
	word: Array<Array<string>>
	column: number
	row: number
	currentRow: number
	currentColumn: number
	shake: number
	submit: () => void
	setWord: (l: Array<Array<string>>) => void
	setColumn: (c: number) => void
	setshake: (s: number) => void
}) {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const y = useMotionValue(0)
	const x = useMotionValue(0)
	const rorateX = useMotionValue(0)
	const height = useMotionValue("0%")
	const [color, setColor] = useState("#2a9d8f")
	const [rotate, setRotate] = useState(0)

	const shake = async () => {
		await animate(x, 100, { duration: 0.1, ease: "easeInOut" })
		await animate(x, 0, { duration: 0.1, ease: "easeInOut" })
		await animate(x, -100, { duration: 0.1, ease: "easeInOut" })
		await animate(x, 0, { duration: 0.1, ease: "easeInOut" })
		await animate(x, 100, { duration: 0.1, ease: "easeInOut" })
		await animate(x, 0, { duration: 0.1, ease: "easeInOut" })
		props.setshake(-1)
	}
	useEffect(() => {
		if (props.shake === props.row) {
			shake()
		}
	}, [props.shake])
	useEffect(() => {
		if (
			props.column === props.currentColumn &&
			props.row === props.currentRow
		) {
			inputRef.current?.focus()
			inputRef.current!.value = ""
			let newWord = [...props.word]
			newWord[props.row][props.column] = ""
			props.setWord(newWord)

			animate(y, -10, { duration: 0.1, ease: "easeInOut" })
		} else {
			animate(y, 0, { duration: 0.1, ease: "easeInOut" })
		}
	}, [props.currentColumn, props.currentRow])
	useEffect(() => {
		if (props.state === "correct") {
			animate(height, "100%", {
				duration: 0.1,
				ease: "easeInOut",
				delay: props.column * 0.1,
			})
			animate(rorateX, 180, {
				duration: 1,
				ease: "easeInOut",
				delay: props.column * 0.1,
			})
			setTimeout(() => setRotate(180), 500 + props.column * 100)
			setColor("#a7c957")
		} else if (props.state === "incorrect") {
			animate(height, "100%", {
				duration: 0.1,
				ease: "easeInOut",
				delay: props.column * 0.1,
			})
			animate(rorateX, 180, {
				duration: 1,
				ease: "easeInOut",
				delay: props.column * 0.1,
			})
			setTimeout(() => setRotate(180), 500 + props.column * 100)
			setColor("#DC2626")
		} else if (props.state === "contains") {
			animate(height, "100%", {
				duration: 0.1,
				ease: "easeInOut",
				delay: props.column * 0.1,
			})
			animate(rorateX, 180, {
				duration: 1,
				ease: "easeInOut",
				delay: props.column * 0.1,
			})
			setTimeout(() => setRotate(180), 500 + props.column * 100)
			setColor("#fcbf49")
		} else {
			inputRef.current!.style.backgroundColor = "transparent"
		}
	}, [props.state])
	useEffect(() => {
		inputRef.current!.value = props.word[props.row][props.column]
	}, [props.row, props.column, props.word])
	const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 1) {
			e.target.value = e.target.value[0]
			inputRef.current?.focus()
		}
	}
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (
			e.key.length === 1 &&
			props.currentColumn % 5 !== 4 &&
			e.key.match(/[a-z]/)
		) {
			props.setColumn(props.currentColumn + 1)
		}
		if (
			e.key === "Backspace" &&
			props.currentColumn > 0 &&
			props.currentColumn % 5 !== 0
		) {
			e.preventDefault()
			if (props.column === 4) {
				inputRef.current!.value = ""
				let newWord = [...props.word]
				newWord[props.row][props.column] = ""
				props.setWord(newWord)
			}
			props.setColumn(props.currentColumn - 1)
		}
		if (
			e.key === "Enter" &&
			props.currentColumn % 5 === 4 &&
			inputRef.current!.value.length === 1
		) {
			e.preventDefault()
			props.submit()
		}
		if (e.key.length === 1 && e.key.match(/[a-zA-Z]/i)) {
			e.preventDefault()
			inputRef.current!.value = e.key.toUpperCase()
			let newWord = [...props.word]
			newWord[props.row][props.column] = e.key.toUpperCase()
			props.setWord(newWord)
		}
		//bild pls
	}
	const handleblur = () => {
		if (
			props.currentColumn === props.column &&
			props.currentRow === props.row
		) {
			inputRef.current?.focus()
		}
	}

	return (
		<motion.div
			className="relative square"
			style={{
				rotateX: rorateX,
				transformStyle: "preserve-3d",
				perspective: 800,
				rotateZ: rotate,
				rotateY: rotate,
			}}
		>
			<motion.input
				ref={inputRef}
				onBlur={handleblur}
				onKeyDown={handleKeyDown}
				onChange={handlechange}
				className="pointer-events-none relative bg-neutral-800 border border-neutral-600 outline-none focus:border-white transition-all w-10 h-10 text-3xl text-center z-10 sm:w-12 sm:h-12 sm:text-5xl md:w-14 md:h-14 md:text-4xl"
				type="text"
				style={{
					y: y,
					x: x,
				}}
			/>
			<motion.div
				style={{
					height: height,
					backgroundColor: color,
				}}
				className="w-full absolute top-0 left-0"
			></motion.div>
		</motion.div>
	)
}
