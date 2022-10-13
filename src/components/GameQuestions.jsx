import { useEffect, useState } from 'react';
import useGameContext from '../context/useGameContext';
import GameQuestion from './GameQuestion';
import '../assets/css/gameboard.scss';

function GameBoard() {
	const {questions, currentQuestion} = useGameContext();

	return (
		<div className="game__board">
			<div className="game__board-content container">
				<ul className="game__board-questions">
					<GameQuestion id={currentQuestion} question={questions[currentQuestion]}></GameQuestion>
				</ul>
			</div>
		</div>
	)
}

export default GameBoard;