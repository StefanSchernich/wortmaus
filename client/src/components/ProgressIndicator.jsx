import "./ProgressIndicator.css";

export default function ProgressBar({ mousePosition, setMousePosition }) {
	const finished = mousePosition === 100;

	return (
		<div className='progressContainer'>
			<div id='mousetrack'>
				<div id='mouse' style={{ left: `${mousePosition}%` }}>
					🐁
				</div>
			</div>
			<div id='cheese'>🧀</div>
			{finished && (
				<div id='party' onClick={() => setMousePosition(0)}>
					🎉
				</div>
			)}
		</div>
	);
}
