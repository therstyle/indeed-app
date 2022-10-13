import { useState, useEffect } from 'react';
import useGameContext from '../context/useGameContext';

function GameQuestion(props) {
	const {id, question} = props;
	const [currentSelection, setCurrentSelection] = useState(false);
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

	function submitHandler(e) {
		e.preventDefault();
		endTurn();
	}

	function changeHandler(e) {
		setCurrentSelection(parseInt(e.target.value));
	}

	function endTurn() {
		const questionsCopy = [...questions];
		questionsCopy[currentQuestion].answered = true;
		questionsCopy[currentQuestion].userCorrect = userCorrect();
		setQuestions(questionsCopy);
		setCurrentSelection(false);
	}

	function nextItem() {
		if (questionsAnswered === 0) {return};
		if (questionsAnswered === totalQuestions) {
			setCurrentComponent('GameOver');
		}
		else {
			setCurrentQuestion(currentQuestion + 1);
		}
	}

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

					<button>Submit</button>
					<div className="game__question-answer"></div>
				</form>
			</article>
		</li>
	)
}

export default GameQuestion;