import { useState } from 'react';
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

	function nextQuestion() {
		setCurrentQuestion(currentQuestion + 1);
	}

	function endTurn() {
		const questionsCopy = [...questions];
		questionsCopy[currentQuestion].answered = true;
		questionsCopy[currentQuestion].userCorrect = userCorrect();
		setQuestions(questionsCopy);
		setCurrentSelection(false);

		const questionsAnswered = questions.filter(question => question?.answered).length;
		const unAnsweredQuestions = questions.filter(question => !question?.answered);

		if (questionsAnswered !== 0 && questionsAnswered === totalQuestions) {
			endGame();
		}
		else {
			nextQuestion();
		}
	}

	function endGame() {
		setCurrentComponent('GameOver');
	}

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