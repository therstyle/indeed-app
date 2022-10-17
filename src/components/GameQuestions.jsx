import useGameContext from '../context/useGameContext';
import GameQuestion from './GameQuestion';
import '../assets/css/gamequestions.scss';

function GameQuestions() {
	const {questions, currentQuestion} = useGameContext();
	const SelectedItem = questions.map((question, index) => {
		if (index === currentQuestion) {
			return (
				<GameQuestion key={index} id={index} question={question}></GameQuestion>
			)
		}
		else {
			return null;
		}
	});

	return (
		<section className="game__board full-height">
			<article className="game__board-content card">
				{
					questions && questions.length > 0 ? (<ul className="game__board-questions">
					{SelectedItem}
				</ul>) : 'Sorry, no questions are available. Please try again later.'
				}
			</article>
		</section>
	)
}

export default GameQuestions;