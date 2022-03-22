import { NavLink } from "react-router-dom";

const MainTabs = ({ tabs, activeTab, setActiveTab }) => {
	return (
		<div className="Main-tabs">
			{Object.keys(tabs).map((tab: string, index: number) => {
				return (
					<div
						className={`tab ${activeTab === tabs[tab] ? "active" : ""}`}
						key={tab + index}
						onClick={() => setActiveTab(tabs[tab])}
					>
						{tabs[tab]}
					</div>
				);
			})}
		</div>
	);
};

export default MainTabs;
