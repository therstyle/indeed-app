import { useEffect } from 'react';
import useGameContext from "../context/useGameContext";
import '../assets/css/gameover.scss';

function GameOver() {
	const {
		setCurrentComponent,
		setCurrentQuestion,
		questions,
		setQuestions,
		playerName,
		playerScore,
		totalQuestions,
		playerScoreHistory,
		setPlayerScoreHistory
	} = useGameContext();

	const endMessages = [
		{
			hasName: `${playerName}, better luck next time!`,
			generic: 'Better luck next time!'
		},
		{
			hasName: `${playerName} try again, you'll do better next time!`,
			generic: `Try again, you'll do better next time!`
		},
		{
			hasName: `Not bad ${playerName}, play again!`,
			generic: 'Not bad, play again!'
		},
		{
			hasName: `Pretty good ${playerName}, play again!`,
			generic: 'Pretty good, play again!'
		},
		{
			hasName: `${playerName} is a trivia pro!`,
			generic: `You're a trivia pro!`
		},
		{
			hasName: `${playerName} is a Trivia master!`,
			generic: `You're a Trivia master!`
		}
	];
	
	const playerHeadline = playerName === '' ? endMessages[playerScore].generic : endMessages[playerScore].hasName;
	const bestScore = Math.max(...playerScoreHistory.map(game => game.score));
	const bestGame = playerScoreHistory.find(game => game.score === bestScore);

	function resetGame() {
		const questionsCopy = [...questions];
		questionsCopy.forEach(question => {
			delete question?.userCorrect;
		});

		setQuestions(questionsCopy);
		setCurrentQuestion(0);
		setCurrentComponent('GameIntro');
	}

	function updateHighScore() {
		const highScoreCopy = [...playerScoreHistory];
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const today = `${month}/${day}/${year}`;

		highScoreCopy.push({
			date: today,
			score: playerScore,
			questions: totalQuestions 
		});

		setPlayerScoreHistory(highScoreCopy);
	}

	function saveHighScore() {
		const data = JSON.stringify(playerScoreHistory);
		localStorage.setItem('playerScoreHistory', data);
	}

	useEffect(() => {
		updateHighScore();
	}, []);

	useEffect(() => {
		saveHighScore();
	}, [playerScoreHistory])

	return (
		<section className="game__over full-height">
			<article className="game__over-content card">
				<div className="game__over-content-main">
					<header>
						<h1>{playerHeadline}</h1>
					</header>
				
					<p>You got {playerScore} out of {totalQuestions} questions right!</p>

					{playerScoreHistory.length > 0 &&
						<p>Your best score so far was {bestGame.score} out of {bestGame.questions} which you got on {bestGame.date}.</p>
					}
				</div>

				<button onClick={() => resetGame()}>Play again!</button>
			</article>
		</section>
	)
}

export default GameOver;