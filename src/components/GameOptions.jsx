import PropTypes from 'prop-types';
import { useState } from 'react';
import useGameContext from '../context/useGameContext';
import '../assets/css/gameoptions.scss';

function GameOptions(props) {
	const {title = 'Game Options'} = props;

	const {
		playerName, 
		setPlayerName,
		playStyle,
		setPlayStyle,
		setCurrentComponent,
		introMusic
	} = useGameContext();

	const [selection, setSelection] = useState(false);

	GameOptions.propTypes = {
		title: PropTypes.string
	}

	function updateName(e) {
		setPlayerName(e.target.value);
	}

	function updatePlayStyle(e) {
		setPlayStyle(e.target.value);
		setSelection(true);
	}

	function submitHandler(e) {
		e.preventDefault();
		introMusic.current.pause();
		introMusic.current.src = '';
		setCurrentComponent('GameQuestions');
	}

	return (
		<section className="game__options full-height">
			<article className="game__options-content card">
				<header className="game__options-header">
					<h2>{title}</h2>
				</header>

				<form className="game__options-choices" onSubmit={(e) => submitHandler(e)}>
					<div className="game__options-option">
						<label className="game__option-title" htmlFor="player_name">Player Name</label>
						<input 
							name="player_name"
							type="text" 
							value={playerName}
							onChange={(e) => {updateName(e)}} 
							placeholder="Optional" 
						/>
					</div>

					<div className="game__options-option">
						<p className="game__option-title">Question Order</p>

						<div className="game__option-multiple-choice">
							<div>
								<input
									name="play_style"
									id="play_style_normal" 
									type="radio" 
									value="normal"
									checked={playStyle === 'normal'}
									className={`${playStyle === 'normal' ? 'checked' : '' } ${selection ? 'animate' : ''}`}
									onChange={(e) => updatePlayStyle(e)}
								/>
								<label htmlFor="play_style_normal">Normal</label>
							</div>

							<div>
								<input
									name="play_style" 
									id="play_style_random"
									type="radio" 
									value="random"
									checked={playStyle === 'random'}
									className={`${playStyle === 'random' ? 'checked' : '' } ${selection ? 'animate' : ''}`}
									onChange={(e) => updatePlayStyle(e)}
								/>
								<label htmlFor="play_style_random">Random</label>
							</div>
						</div>
					</div>
					
					<button>Start Quiz</button>
				</form>
			</article>
		</section>
	)
}

export default GameOptions;