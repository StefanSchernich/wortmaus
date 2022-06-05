import "./RightWrongIndicator.css";

export default function RightWrongIndicator({ answerIsCorrect, correctTranslation }) {
	let className = "rightWrongIndicator";
	if (answerIsCorrect === true) {
		className += " right";
	} else if (answerIsCorrect === false) {
		className += " wrong";
	}
	// console.log(answerIsCorrect, className);

	return <p className={className}>{answerIsCorrect ? "Richtig!" : `Leider falsch. Richtig: ${correctTranslation}`}</p>;
}
