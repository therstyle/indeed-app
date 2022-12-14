import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useGameContext from '../context/useGameContext';
import '../assets/css/gamequestion.scss';

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
		playerScore,
		setPlayerScore,
		setCurrentComponent
	} = useGameContext();

	const userCorrect = () => question?.answerIndex.includes(currentSelection);
	const statusMessage = userCorrect() ? 'You got it right!' : 'Sorry, wrong answer';
	const statusClass = userCorrect() ? 'answer-correct' : 'answer-wrong';
	const buttonText = id + 1 === totalQuestions ? 'View results' : 'Next question';

	GameQuestion.propTypes = {
		id: PropTypes.number,
		question: PropTypes.object
	}

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

	function selectionMade() {
		const questionsCopy = [...questions];
		questionsCopy[currentQuestion].userCorrect = userCorrect();
		setPlayerScore(questionsCopy.filter(question => question?.userCorrect).length);
		setQuestions(questionsCopy);
	}

	function endTurn() {
		if (id + 1 === totalQuestions) {
			setCurrentComponent('GameOver');
		}
		else {
			setCurrentQuestion(id + 1);
		}
	}

	useEffect(() => {
		selectionMade();
	}, [currentSelection]);

	return (
		<li id={`game-question-${id}`} className="game__question">
			<div className="game__question-content">
				<header className="game__question-header">
					<h3 className="game__header-title">Question {id + 1} of {totalQuestions}</h3>
					<h3 className="game__header-score"> Score: {playerScore}</h3>
				</header>
				
				<div className="game__question-title">{question?.question}</div>

				<form className="game__question-choices" onSubmit={(e) => submitHandler(e)}>
					<ul>
						{question?.options.map((option, index) => (
							<li key={index}>
								<input 
								type="radio"
								id={`game-question-${id}_option-${index}`} 
								name={`game-question-${id}_option-${index}`}
								checked={currentSelection === index}
								className={currentSelection === index ? 'checked animate' : ''}
								onChange={(e) => changeHandler(e)}
								value={index}
								disabled={currentSelection !== null}
								/>

								<label htmlFor={`game-question-${id}_option-${index}`}>{option}</label>
							</li>
						))}
					</ul>
					
					<div className="game__question-action">
						<button>{buttonText}</button>
						{currentSelection !== null && <div className={`game__question-answer ${statusClass}`}>{statusMessage}</div>}

						{error && <div className="game__question-error">Please choose an option to continue</div>}
					</div>
				</form>
			</div>
		</li>
	)
}

export default GameQuestion;