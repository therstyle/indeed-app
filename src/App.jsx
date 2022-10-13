import { useEffect, useState } from 'react';
import GameIntro from './components/GameIntro';
import GameOptions from './components/GameOptions';
import GameQuestions from './components/GameQuestions';
import GameOver from './components/GameOver';
import useGameContext from './context/useGameContext';
import './assets/css/global.scss';

function App() {
	const {currentComponent} = useGameContext();

	const components = {
		"GameIntro": GameIntro,
		"GameOptions": GameOptions,
		"GameQuestions": GameQuestions,
		"GameOver": GameOver
	};

	const CurrentView = components[currentComponent];
	const {setPlayerScoreHistory} = useGameContext();

	function loadHighScore() {
		const data = localStorage.getItem('playerScoreHistory');
		if (!data) {return};

		setPlayerScoreHistory(JSON.parse(data));
	}

	useEffect(() => {
		loadHighScore();
	}, []);

	return (
		<div className="game">
				<CurrentView></CurrentView>
		</div>
	)
}

export default App;