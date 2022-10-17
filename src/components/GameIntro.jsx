import Lottie from 'lottie-react';
import useGameContext from '../context/useGameContext';
import animationBrain from '../assets/lottie/brain.json';
import '../assets/css/gameintro.scss';

function GameIntro() {
	const {setCurrentComponent} = useGameContext();

	return (
		<section className="game__intro full-height">
			<article className="game__intro-content card">
				<header className='game__intro-header'>
					<img src="images/indeed_logo.svg" alt="Indeed logo" />
					<h1>Quiz Bowl</h1>
				</header>

				<Lottie 
					animationData={animationBrain} 
					loop={false}
					className="game__intro-lottie"
				></Lottie>

				<button onClick={() => {setCurrentComponent('GameOptions')}}>Start Game</button>
			</article>
		</section>
	)
}

export default GameIntro;