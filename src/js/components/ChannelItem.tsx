import { Channel, program } from "./ChannelItemsList";

const ChannelItem = ({ img, name, programs }: Channel) => {
	return (
		<div className="ChannelItem">
			<div className="img-container">
				<div
					className="img"
					style={{
						background: `url("${img}") no-repeat center `,
					}}
				></div>
			</div>
			<div className="ChannelItem-info">
				<div className="ChannelItem-info-name">{name}</div>
				{programs.map((program: program) => {
					return (
						<div
							key={program.title + Math.random()}
							className={`ChannelItem-info-program ${
								program.current ? "_current" : ""
							}`}
						>
							<div className="time">{program.time}</div>
							<div className="title">{program.title}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ChannelItem;
