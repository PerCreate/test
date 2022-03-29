import { program } from "./Channel";

const programs: program[] = [
	{
		time: "13:00",
		title: "Новости (с субтитрами)",
		current: true,
	},
];

const ChannelList = () => {
	return <div className="Channel"></div>;
};

export default ChannelList;
