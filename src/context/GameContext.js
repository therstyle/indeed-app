import { createContext, useState, useEffect } from 'react';

const GameContext = createContext(null);

function GameContextProvider(props) {
	const [questions, setQuestions] = useState([]);
	const totalQuestions = questions.length;
	const playerScore = questions.filter(question => question?.userCorrect).length;
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentComponent, setCurrentComponent] = useState('GameIntro');
	const [playerName, setPlayerName] = useState('');
	const [playStyle, setPlayStyle] = useState('normal');
	const [playerScoreHistory, setPlayerScoreHistory] = useState([]);

	const {children} = props;
	const data = {
		questions,
		setQuestions,
		totalQuestions,
		playerScore,
		currentQuestion,
		setCurrentQuestion,
		currentComponent,
		setCurrentComponent,
		playerName,
		setPlayerName,
		playerScoreHistory,
		setPlayerScoreHistory
	}

	async function loadData(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();

			setQuestions(data); 
		}
		catch(error) {
			console.error(error);
		}
	}

	useEffect(() => {
		loadData('data.json');
	}, []);

	return (
		<GameContext.Provider value={data}>
			{children}
		</GameContext.Provider>
	)
}

export { GameContext, GameContextProvider};