import useGameContext from '../context/useGameContext';
import '../assets/css/gameintro.scss';

function GameIntro() {
	const {setCurrentComponent} = useGameContext();

	return (
		<section className="game__intro">
			<div className="game__intro-content container">
				<button onClick={() => {setCurrentComponent('GameOptions')}}>Start Game</button>
			</div>
		</section>
	)
}

export default GameIntro;