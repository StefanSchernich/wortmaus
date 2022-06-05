import React, { useEffect } from "react";
import "./Form.css";

export default function Form({
	userTranslation,
	setUserTranslation,
	setAnswerIsCorrect,
	handleTippClick,
	handleSubmit,
	inputRef,
	inputIsValid,
	setInputIsValid,
}) {
	let inputInvalid_answer = "";
	let inputInvalid_feedback = "";
	if (!inputIsValid) {
		inputInvalid_feedback = "visible";
		inputInvalid_answer = "redBorder";
	}
	useEffect(() => {
		userTranslation && setInputIsValid(true);
	});

	return (
		<form onSubmit={handleSubmit}>
			<div className='inputContainer'>
				<input
					id='answer'
					className={inputInvalid_answer}
					ref={inputRef}
					type='text'
					placeholder='Deine Antwort'
					autoFocus
					autoComplete='off'
					autoCorrect='off'
					value={userTranslation}
					onChange={(e) => {
						setUserTranslation(e.target.value);
						setAnswerIsCorrect(null);
					}}></input>
				<button id='hintBtn' onClick={handleTippClick}>
					💡 Tipp
				</button>
			</div>
			<span id='inputValidityFeedback' className={inputInvalid_feedback}>
				Input erforderlich
			</span>
			<input id='submitBtn' type='submit' value='Prüfen'></input>
		</form>
	);
}
