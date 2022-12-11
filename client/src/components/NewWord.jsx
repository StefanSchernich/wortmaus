import { useState, useRef } from "react";
import "./NewWord.css";
import axios from "axios";

export default function NewWord(props) {
	const [input, setInput] = useState("");
	const [addSuccess, setAddSuccess] = useState(null);

	const newWordInput = useRef();

	let addFeedback;
	if (addSuccess) {
		addFeedback = <div className='addFeedback addSuccess'>Wort erfolgreich hinzugefügt</div>;
	} else if (addSuccess === false) {
		addFeedback = <div className='addFeedback addFail'>Fehler beim Hinzufügen</div>;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			if (!input || input === " " || /\W/.test(input)) throw Error("Ungültiger Input!");
			const {
				data: { addedWord },
			} = await axios.post("/addWord", {
				newWord: input,
			});
			console.log(addedWord);
			setAddSuccess(true);
			setInput("");
			newWordInput.current.focus();
		} catch (error) {
			setAddSuccess(false);
			console.error(error);
		}
	}

	return (
		<section id='newWordSection'>
			<h3>Neues Wort hinzufügen</h3>
			<form className='newWordForm' onSubmit={handleSubmit}>
				<input id='input' type='text' ref={newWordInput} value={input} onChange={(e) => setInput(e.target.value)} autoFocus />
				<input id='addBtn' type='submit' value='Hinzufügen' />
			</form>
			{addFeedback}
		</section>
	);
}
