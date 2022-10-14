import { useState, useEffect } from 'react';
import useGameContext from '../context/useGameContext';

function GameQuestion(props) {
	const {id, question} = props;
	const [currentSelection, setCurrentSelection] = useState(null);
	const [error, setError] = useState(false);
	const [statusMessage, setStatusMessage] = useState('');
	const {
		questions,
		setQuestions,
		currentQuestion, 
		setCurrentQuestion,
		totalQuestions,
		questionsAnswered,
		playerScore,
		setCurrentComponent
	} = useGameContext();

	const userCorrect = () => question?.answerIndex.includes(currentSelection);

	//TODO disable radio buttons after next question is pressed

	function submitHandler(e) {
		e.preventDefault();
		
		if (currentSelection === null) {
			setError(true);
		}
		else {
			setError(false);
			updateStatus();

			setTimeout(() => {
				endTurn();
			}, 5000)
		}
	}

	function changeHandler(e) {
		setError(false);
		setCurrentSelection(parseInt(e.target.value));
	}

	function endTurn() {
		const questionsCopy = [...questions];
		questionsCopy[currentQuestion].answered = true;
		questionsCopy[currentQuestion].userCorrect = userCorrect();
		setQuestions(questionsCopy);
		setCurrentSelection(false);

		reset();
	}

	function nextItem() {
		if (questionsAnswered === 0 && !error) {return};
		if (questionsAnswered === totalQuestions) {
			setCurrentComponent('GameOver');
		}
		else {
			setCurrentQuestion(currentQuestion + 1);
		}
	}

	function updateStatus() {
		if (userCorrect()) {
			setStatusMessage('You got it right!')
		}
		else {
			setStatusMessage('Wrong answer');
		}
	}

	function reset() {
		setCurrentSelection(null);
		setError(false);
		setStatusMessage('');
	}

	// useEffect(() => {
	// 	updateStatus();
	// }, [currentSelection])

	useEffect(() => {
		nextItem();
	}, [questions]);

	return (
		<li id={`game-question-${id}`} className="game__question">
			<article className="game__question-content">
				<p>PlayerScore = {playerScore}</p>
				<h3>{question?.question}</h3>

				<form onSubmit={(e) => submitHandler(e)}>
					<ul>
						{question?.options.map((option, index) => (
							<li key={index}>
								<input 
								type="radio"
								id={`game-question-${id}_option-${index}`} 
								name={`game-question-${id}_option-${index}`}
								checked={currentSelection === index}
								onChange={(e) => changeHandler(e)}
								value={index} />

								<label htmlFor={`game-question-${id}_option-${index}`}>{option}</label>
							</li>
						))}
					</ul>

					<button>Next question</button>
					{currentSelection !== null && <div className="game__question-answer">{statusMessage}</div>}

					{error && <div className="game__question-error">Please choose an option to continue</div>}
				</form>
			</article>
		</li>
	)
}

export default GameQuestion;