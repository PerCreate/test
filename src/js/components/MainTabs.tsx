import { tabsType } from "js/page/Main";
interface MainTabsProps {
	tabs: tabsType;
	activeTab: string;
	setActiveTab: (arg0: string) => void;
}

const MainTabs = ({ tabs, activeTab, setActiveTab }: MainTabsProps) => {
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
