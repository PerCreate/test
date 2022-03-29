export type program = { time: string; title: string; current: boolean };

export interface ChannelProps {
	img: string;
	name: string;
	programs: program[];
}

const Channel = ({ img, name, programs }: ChannelProps) => {
	return (
		<div className="Channel">
			<div
				className="img-container"
				style={{
					background: `url("${img}") no-repeat center / cover`,
				}}
			></div>
			<div className="Channel-name">{name}</div>
			{programs.map((program: program) => {
				return (
					<div className={`Channel-program ${program.current ? "_current" : ""}`}>
						<div className="time">{program.time}</div>
						<div className="title">{program.title}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Channel;
