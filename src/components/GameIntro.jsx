import PropTypes from 'prop-types';
import Lottie from 'lottie-react';
import useGameContext from '../context/useGameContext';
import animationBrain from '../assets/lottie/brain.json';
import '../assets/css/gameintro.scss';
import { ReactComponent as Logo } from '../assets/images/IndeedLogo.svg';

function GameIntro(props) {
	const {title = 'Quiz Bowl'} = props;
	const {setCurrentComponent, introMusic} = useGameContext();

	GameIntro.propTypes = {
		title: PropTypes.string
	}

	function initGame() {
		setCurrentComponent('GameOptions');
		introMusic.current.src = 'audio/intro.mp3';
		introMusic.current.play();
	}

	return (
		<section className="game__intro full-height">
			<article className="game__intro-content card">
				<header className="game__intro-header">
					<Logo className="game__intro-logo" title="Indeed logo" />
					<h1>{title}</h1>
				</header>

				<Lottie 
					animationData={animationBrain} 
					loop={false}
					className="game__intro-lottie"
				></Lottie>

				<button onClick={() => {initGame()}}>Start Game</button>
			</article>
		</section>
	)
}

export default GameIntro;