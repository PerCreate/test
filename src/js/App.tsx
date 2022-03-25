import Header from "./shared/Header";
import Main from "./page/Main";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Scrollbar from "./components/Scrollbar";
import Footer from "./shared/Footer";

const App = () => {
	return (
		<Router>
			<Scrollbar>
				<div className="App container">
					<Header />
					<Routes>
						<Route path="/main/*" element={<Main />} />
						<Route path="/" element={<Navigate to="/main" />} />
					</Routes>
					<Footer />
				</div>
			</Scrollbar>
		</Router>
	);
};

export default App;
