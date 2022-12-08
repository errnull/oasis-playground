import React from "react";
import { runTrailEffect } from "./oasis";

function App() {
	React.useEffect(() => {
		runTrailEffect();
	}, []);

	return (
		<canvas id="canvas" style={{ width: "100vw", height: "100vh" }}></canvas>
	);
}

export default App;
