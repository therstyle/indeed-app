import useGameContext from '../context/useGameContext';
import GameQuestion from './GameQuestion';
import '../assets/css/gamequestions.scss';

function GameBoard() {
	const {questions, currentQuestion} = useGameContext();

	return (
		<section className="game__board full-height">
			<article className="game__board-content card">
				<ul className="game__board-questions">
					<GameQuestion id={currentQuestion} question={questions[currentQuestion]}></GameQuestion>
				</ul>
			</article>
		</section>
	)
}

export default GameBoard;