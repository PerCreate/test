import { getPathToAssets } from "js/utils/Utils";
import { RefObject, useRef } from "react";
import Channel from "./ChannelItem";
import Scrollbar from "./Scrollbar";

export type program = { time: string; title: string; current?: boolean };

export type Channel = {
	name: string;
	img: string;
	programs: program[];
};

const channel1: Channel = {
	name: "Первый канал",
	img: "1st.svg",
	programs: [
		{
			time: "13:00",
			title: "Новости (с субтитрами)",
			current: true,
		},
		{
			time: "14:00",
			title: "Давай поженимся",
		},
		{
			time: "15:00",
			title: "Другие новости",
		},
	],
};
const channel2: Channel = {
	name: "2x2",
	img: "2x2.svg",
	programs: [
		{
			time: "13:00",
			title: "МУЛЬТ ТВ. Сезон 4, 7 серия",
			current: true,
		},
		{
			time: "14:00",
			title: "ПОДОЗРИТЕЛЬНАЯ СОВА. Сезон 7, 7 серия",
		},
		{
			time: "15:00",
			title: "БУРДАШЕВ. Сезон 1, 20 серия",
		},
	],
};
const channel3: Channel = {
	name: "РБК",
	img: "rbc.svg",
	programs: [
		{
			time: "13:00",
			title: "ДЕНЬ. Горючая смесь: как бороться с суррогатом на АЗС",
			current: true,
		},
		{
			time: "14:00",
			title: "ДЕНЬ. Главные темы",
		},
		{
			time: "15:00",
			title: "Главные новости",
		},
	],
};
const channel4: Channel = {
	name: "AMEDIA PREMIUM",
	img: "amedia.svg",
	programs: [
		{
			time: "13:00",
			title: "Клиент всегда мёртв",
			current: true,
		},
		{
			time: "14:00",
			title: "Голодные игры: Сойка-пересмешница. Часть I",
		},
		{
			time: "15:00",
			title: "Секс в большом городе",
		},
	],
};

const channelsDefault: Channel[] = [channel1, channel2, channel3, channel4];

interface ChannelListProps {
	channels?: Channel[];
}

const ChannelItemsList = ({ channels = channelsDefault }: ChannelListProps) => {
	const channelList = useRef<HTMLDivElement>();
	const path = getPathToAssets();
	//Увеличил для эффекта большего размера
	channels = [...channels, ...channels];
	// Это нужно для корректной работы внешнего кастомного скроллера
	// В реальном проекте, если использовать кастомный скролл, то логику ниже выносим либо в отдельное абстрактное место,
	// либо везде используем кастомный скроллбар и дорабатываем его логику.
	const onScrollEvent = (e: React.WheelEvent | React.TouchEvent) => {
		const currentList = channelList.current;

		if (
			currentList &&
			(!currentList?.scrollTop ||
				currentList?.scrollTop === currentList.scrollHeight - currentList.offsetHeight)
		) {
			if (!currentList?.scrollTop) {
				e = e as React.WheelEvent;
				if (e.deltaY > 0) {
					e.stopPropagation();
				}
			}

			if (currentList.scrollTop === currentList.scrollHeight - currentList.offsetHeight) {
				e = e as React.WheelEvent;
				if (e.deltaY < 0) {
					e.stopPropagation();
				}
			}

			return;
		}
		e.stopPropagation();
	};

	return (
		<div
			className="ChannelItemsList"
			ref={channelList as RefObject<HTMLDivElement>}
			onWheel={onScrollEvent}
			onTouchStart={onScrollEvent}
		>
			{channels.map((channel: Channel) => {
				return (
					<Channel
						key={channel.name + Math.random()}
						img={path + `/channels/${channel.img}`}
						name={channel.name}
						programs={channel.programs}
					/>
				);
			})}
		</div>
	);
};

export default ChannelItemsList;
