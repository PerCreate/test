import Header from "./shared/Header";
import Main from "./page/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
	return (
		<Router>
			<div className="App container">
				<Header />
				<Routes>
					<Route path="/main/*" element={<Main />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
