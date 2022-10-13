import { useState } from 'react';
import useGameContext from '../context/useGameContext';

function GameOptions() {
	const {
		playerName, 
		setPlayerName,
		setCurrentComponent
	} = useGameContext();

	function updateName(e) {
		setPlayerName(e.target.value);
	}

	return (
		<div className="game__options">
			<div className="game__options-content container">
				<label htmlFor="player_name">Player Name</label>
				<input name="player_name" 
					value={playerName}
					onChange={(e) => {updateName(e)}} 
					placeholder="Player Name" 
					type="text"
				/>
				
				<button onClick={() => setCurrentComponent('GameQuestions')}>Start Quiz</button>
			</div>
		</div>
	)
}

export default GameOptions;