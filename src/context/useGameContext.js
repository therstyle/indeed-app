import { useContext } from 'react';
import { GameContext } from './GameContext';

const useGameContext = () => useContext(GameContext);

export default useGameContext;
