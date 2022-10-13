import useGameContext from '../context/useGameContext';

function GameOptions() {
	const {
		playerName, 
		setPlayerName,
		playStyle,
		setPlayStyle,
		setCurrentComponent
	} = useGameContext();

	function updateName(e) {
		setPlayerName(e.target.value);
	}

	function updatePlayStyle(e) {
		setPlayStyle(e.target.value);
	}

	return (
		<div className="game__options">
			<div className="game__options-content container">
				<div className="game__options-option">
					<label htmlFor="player_name">Player Name</label>
					<input 
						name="player_name"
						type="text" 
						value={playerName}
						onChange={(e) => {updateName(e)}} 
						placeholder="Player Name" 
					/>
				</div>

				<div className="game__options-option">
					<p>Question Order</p>

					<input
						name="play_style"
						id="play_style_normal" 
						type="radio" 
						value="normal"
						checked={playStyle === 'normal'}
						onChange={(e) => updatePlayStyle(e)}
					/>
					<label htmlFor="play_style_normal">Normal</label>

					<input
						name="play_style" 
						id="play_style_random"
						type="radio" 
						value="random"
						checked={playStyle === 'random'}
						onChange={(e) => updatePlayStyle(e)}
					/>
					<label htmlFor="play_style_random">Random</label>
				</div>
				
				<button onClick={() => setCurrentComponent('GameQuestions')}>Start Quiz</button>
			</div>
		</div>
	)
}

export default GameOptions;