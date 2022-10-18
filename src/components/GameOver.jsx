import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import useGameContext from "../context/useGameContext";
import '../assets/css/gameover.scss';
import animationGood from '../assets/lottie/good.json';
import animationBetter from '../assets/lottie/better.json';
import animationBest from '../assets/lottie/best.json';

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

	const [endMessages, setEndMessages] = useState([]);
	const playerHeadline = playerName === '' ? endMessages[playerScore].generic : insertPlayerName(endMessages[playerScore]?.hasName);
	const bestScore = Math.max(...playerScoreHistory.map(game => game.score));
	const bestGame = playerScoreHistory.find(game => game.score === bestScore);

	const animation = {
		"good": animationGood,
		"better": animationBetter,
		"best": animationBest
	}

	async function loadData(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();

			setEndMessages(data?.endMessages); 
		}
		catch(error) {
			console.error(error);
		}
	}

	function insertPlayerName(string) {
		if (!string) {return};
		return string.replaceAll('${playerName}', playerName);
	}

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
		loadData('data.json');
		updateHighScore();
	}, []);

	useEffect(() => {
		saveHighScore();
	}, [playerScoreHistory])

	return (
		<section className="game__over full-height">
			<article className="game__over-content card">
				<div className="game__over-content-main">
					{
						endMessages.length > 0 && 
						
						<>
							<header>
								<h1>{playerHeadline}</h1>
							</header>

							<Lottie 
								className="game__over-lottie" 
								animationData={animation[endMessages[playerScore]?.animation]}
							>
							</Lottie>
						</>
					}
				
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