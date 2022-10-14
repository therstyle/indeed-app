import { useState, useEffect } from 'react';
import useGameContext from '../context/useGameContext';

function GameQuestion(props) {
	const {id, question} = props;
	const [currentSelection, setCurrentSelection] = useState(null);
	const [error, setError] = useState(false);
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
	const statusMessage = userCorrect() ? 'You got it right!' : 'Sorry, wrong answer';
	const statusClass = userCorrect() ? 'answer-correct' : 'answer-wrong';

	function submitHandler(e) {
    e.preventDefault();
    
    if (currentSelection === null) {
      setError(true);
    }
    else {
      setError(false);
			endTurn();
    }
  }

	function changeHandler(e) {
		setCurrentSelection(parseInt(e.target.value));
		setError(false);
	}

	function endTurn() {
		const questionsCopy = [...questions];
		questionsCopy[currentQuestion].answered = true;
		questionsCopy[currentQuestion].userCorrect = userCorrect();
		setQuestions(questionsCopy);
		reset();
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

	function reset() {
    setCurrentSelection(null);
    setError(false);
  }

	useEffect(() => {
		nextItem();
	}, [questions]);

	return (
		<li id={`game-question-${id}`} className="game__question">
			<article className="game__question-content">
				<header className="game__question-header">
				<h3>Question {currentQuestion + 1} of {totalQuestions}</h3>
				<h3>PlayerScore = {playerScore}</h3>
				</header>
				
				<p>{question?.question}</p>

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
								value={index}
								disabled={currentSelection !== null}
								/>

								<label htmlFor={`game-question-${id}_option-${index}`}>{option}</label>
							</li>
						))}
					</ul>

					<button>Next question</button>
					{currentSelection !== null && <div className={`game__question-answer ${statusClass}`}>{statusMessage}</div>}

          {error && <div className="game__question-error">Please choose an option to continue</div>}
				</form>
			</article>
		</li>
	)
}

export default GameQuestion;