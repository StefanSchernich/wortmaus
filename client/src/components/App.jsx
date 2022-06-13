import { useEffect, useState, useRef } from "react";
import "./App.css";

import { Link } from "react-router-dom";
import Form from "./Form";
import LanguageSelector from "./LanguageSelector";
import RightWrongIndicator from "./RightWrongIndicator";
import ProgressIndicator from "./ProgressIndicator";
import axios from "axios"; // Relative link possible because of 'proxy' in in package.json

export default function App() {
	const [selectedLanguage, setSelectedLanguage] = useState("en");

	// word to be translated
	const [word, setWord] = useState("");

	// Current value of input field
	const [userTranslation, setUserTranslation] = useState("");

	// Check that input not empty
	const [inputIsValid, setInputIsValid] = useState(true);

	// Comparison of user input with correct Google translation
	const [answerIsCorrect, setAnswerIsCorrect] = useState(null);

	// Position of Mouse Tracker
	const [mousePosition, setMousePosition] = useState(0);

	/* #### REFS #### */
	// Correct Google Translation --> with useRef to keep value between re-renders
	const correctTranslation = useRef();

	// Number of Hints Counter
	const hintNumber = useRef(0);

	const inputRef = useRef();

	/* HANDLERS */
	function handleLanguageClick(language) {
		setSelectedLanguage(language);
		setInputIsValid(true);
		setAnswerIsCorrect(null);
	}

	function handleTippClick(event) {
		event.preventDefault();
		setAnswerIsCorrect(null);
		if (hintNumber.current > correctTranslation.current.length) return;
		setUserTranslation(correctTranslation.current.slice(0, hintNumber.current + 1));
		hintNumber.current++;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		// Handle invalid input
		if (!userTranslation) {
			setInputIsValid(false);
			setAnswerIsCorrect(null);
			return;
		}

		const suggestion = userTranslation.trim();
		// console.log(`sent for checking: ${suggestion}`)

		// Check if answer is correct (= user suggestion matches Google translation)
		const isCorrect = checkAnswer(suggestion, correctTranslation.current);
		if (isCorrect) {
			setMousePosition((prevMousePosition) => prevMousePosition + 2);
		} // TODO: fix commit message: Mouse cannot move to negative X
		setAnswerIsCorrect(isCorrect);

		// Reset input field and get next word
		setUserTranslation("");
		hintNumber.current = 0;
		getWord();
		inputRef.current.focus();
	}

	useEffect(() => {
		try {
			getWord();
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		async function getTranslation(word) {
			if (!word) return;
			const {
				data: { translation },
			} = await axios.post("/translate", { word, selectedLanguage });
			if (translation) {
				correctTranslation.current = translation;
			}
		}

		getTranslation(word);
	}, [selectedLanguage, word]);

	// Event-Listener für "Enter"
	useEffect(() => {
		function handleEnter(event) {
			if (event.key === "Enter") {
				handleSubmit(event);
			}
		}

		document.addEventListener("keydown", handleEnter);
		return () => document.removeEventListener("keydown", handleEnter);
	});

	// HELPER
	async function getWord() {
		const { data: word } = await axios.get("/getWord"); // Relative link possible because of 'proxy' in in package.json
		setWord(word);
	}

	function checkAnswer(suggestion, correctTranslation) {
		console.log(correctTranslation);
		return suggestion.toLowerCase() === correctTranslation.toLowerCase();
	}

	return (
		<>
			<main>
				<p id='sourceWordLabel'>Übersetze:</p>
				<p id='sourceWord'>
					<strong>{word}</strong>
				</p>
				<Form
					userTranslation={userTranslation}
					setUserTranslation={setUserTranslation}
					inputRef={inputRef}
					inputIsValid={inputIsValid}
					setInputIsValid={setInputIsValid}
					setAnswerIsCorrect={setAnswerIsCorrect}
					handleTippClick={handleTippClick}
					handleSubmit={handleSubmit}
				/>
				<RightWrongIndicator answerIsCorrect={answerIsCorrect} correctTranslation={correctTranslation.current} />
				<ProgressIndicator mousePosition={mousePosition} setMousePosition={setMousePosition} />
			</main>
			<footer>
				<LanguageSelector selectedLanguage={selectedLanguage} handleLanguageClick={handleLanguageClick} />
				<Link to='/new'>
					<input id='newWordBtn' type='submit' value='Neues Wort hinzufügen' readOnly={true}></input>
				</Link>
			</footer>
		</>
	);
}
