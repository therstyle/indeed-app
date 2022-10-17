import { createContext, useState, useEffect, useRef } from 'react';

const GameContext = createContext(null);

function GameContextProvider(props) {
	const [questions, setQuestions] = useState([]);
	const totalQuestions = questions.length;
	const [playerScore, setPlayerScore] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentComponent, setCurrentComponent] = useState('GameIntro');
	const [playerName, setPlayerName] = useState('');
	const [playStyle, setPlayStyle] = useState('normal');
	const [playerScoreHistory, setPlayerScoreHistory] = useState([]);
	const introMusic = useRef(new Audio());

	const {children} = props;
	const data = {
		questions,
		setQuestions,
		totalQuestions,
		playerScore,
		setPlayerScore,
		currentQuestion,
		setCurrentQuestion,
		currentComponent,
		setCurrentComponent,
		playerName,
		setPlayerName,
		playStyle,
		setPlayStyle,
		playerScoreHistory,
		setPlayerScoreHistory,
		introMusic
	}

	async function loadData(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			const questionsOrder = playStyle === 'random' ? data.sort((a, b) => 0.5 - Math.random()) : data;

			setQuestions(questionsOrder); 
		}
		catch(error) {
			console.error(error);
		}
	}

	useEffect(() => {
		loadData('data.json');
	}, [playStyle, playerScoreHistory]);

	return (
		<GameContext.Provider value={data}>
			{children}
		</GameContext.Provider>
	)
}

export { GameContext, GameContextProvider};