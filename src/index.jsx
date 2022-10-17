import { render } from "react-dom";
import { GameContextProvider } from "./context/GameContext";

import App from "./App";

const rootElement = document.getElementById("root");
render(
	<GameContextProvider>
		<App />
	</GameContextProvider>
	, 
rootElement);
