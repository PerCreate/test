import { debounce } from "js/utils/Utils";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

const Scrollbar = ({ children }) => {
	const [startPosBtnY, setStartPosBtnY] = useState(0);
	const [startMovingPosBtnY, setStartMovingPosBtnY] = useState(0);
	const [currentPosBtnY, setCurrentPosBtnY] = useState(0);

	const wrapper = useRef<HTMLDivElement>();
	const btnScrollbar = useRef<HTMLDivElement>();
	const wrapperContent = useRef<HTMLDivElement>();

	const [scrollbarHeight, setScrollbarHeight] = useState(0);
	const [P, setP] = useState(0);
	const [btnScrollbarHeight, setBtnScrollbarHeight] = useState(0);
	const [isBtnDown, setIsBtnDown] = useState(false);
	const [isWheelEvent, setIsWheelEvent] = useState(true);
	//working блочить кастомный скролл при touchmove внутри content
	useEffect(() => {
		const obs = new MutationObserver(debounce(setInitial, 80));
		obs.observe(wrapper.current, { childList: true, subtree: true });
		window.onresize = () => {
			setInitial();
		};
	}, []);

	useEffect(() => {
		setCurrentPosition();
	}, [currentPosBtnY, startPosBtnY]);

	useEffect(() => {
		setCurrentPosition();
	}, [startPosBtnY]);

	const setInitial = () => {
		const visibleContentHeight: number = wrapper.current.offsetHeight;
		const contentHeight: number = wrapperContent.current.offsetHeight;

		setScrollbarHeight(visibleContentHeight);
		setP(visibleContentHeight / contentHeight);
		setBtnScrollbarHeight((visibleContentHeight / contentHeight) * visibleContentHeight);
		btnScrollbar.current.style.height =
			(visibleContentHeight / contentHeight) * visibleContentHeight + "px";
	};

	const setCurrentPosition = () => {
		const currentDeltaY = startMovingPosBtnY + (currentPosBtnY - startPosBtnY);
		const enableSpaceDown = scrollbarHeight - btnScrollbarHeight;

		if (isBtnDown) {
			if (currentDeltaY < 0) {
				btnScrollbar.current.style.top = 0 + "px";
				wrapperContent.current.style.top = 0 + "px";
				return;
			}

			if (enableSpaceDown - currentDeltaY < 0) {
				btnScrollbar.current.style.top = enableSpaceDown + "px";
				wrapperContent.current.style.top = -enableSpaceDown / P + "px";
				return;
			}
			btnScrollbar.current.style.top = currentDeltaY + "px";
			wrapperContent.current.style.top = -currentDeltaY / P + "px";
			return;
		}

		if (isWheelEvent) {
			setIsWheelEvent(false);
			if (startPosBtnY < 0) {
				btnScrollbar.current.style.top = 0 + "px";
				wrapperContent.current.style.top = 0 + "px";
				setStartPosBtnY(0);
				setStartMovingPosBtnY(0);
				return;
			}
			if (enableSpaceDown - startPosBtnY < 0) {
				btnScrollbar.current.style.top = enableSpaceDown + "px";
				wrapperContent.current.style.top = -enableSpaceDown / P + "px";
				setStartPosBtnY(enableSpaceDown);
				setStartMovingPosBtnY(enableSpaceDown);
				return;
			}
			btnScrollbar.current.style.top = startPosBtnY + "px";
			wrapperContent.current.style.top = -startPosBtnY / P + "px";
			setStartMovingPosBtnY(startPosBtnY);
			return;
		}
	};

	const btnScrollbarDown = (e) => {
		if (e.target.id === "wrapper-scrollbar-button" || e.type === "touchstart") {
			var currentPosition = e.clientY;
			if (e.type === "touchstart") {
				currentPosition = -e.changedTouches[0].clientY;
			}

			setStartPosBtnY(currentPosition);
			setCurrentPosBtnY(currentPosition);
			setIsBtnDown(true);
		}
	};
	const btnScrollbarMove = (e) => {
		if (e.type === "touchmove") {
			setCurrentPosBtnY(-e.changedTouches[0].clientY);
			return;
		}
		isBtnDown && setCurrentPosBtnY(e.clientY);
	};
	const btnScrollbarUp = (e) => {
		setStartMovingPosBtnY(btnScrollbar.current.offsetTop);
		setStartPosBtnY(btnScrollbar.current.offsetTop);
		setIsBtnDown(false);
	};

	const wheelEvent = (e) => {
		const { deltaY } = e;
		setIsWheelEvent(true);
		setStartPosBtnY(startPosBtnY + deltaY);
	};

	return (
		<>
			{/* {!isDataSet && <Loader />} */}
			<div
				className={`Wrapper ${isBtnDown ? "_moving" : ""}`}
				id="wrapper"
				ref={wrapper}
				onMouseDown={(e) => btnScrollbarDown(e)}
				onMouseMove={(e) => btnScrollbarMove(e)}
				onMouseUp={(e) => btnScrollbarUp(e)}
				onTouchStart={(e) => btnScrollbarDown(e)}
				onTouchMove={(e) => btnScrollbarMove(e)}
				onTouchEnd={(e) => btnScrollbarUp(e)}
				onWheel={(e) => wheelEvent(e)}
			>
				<div className="Wrapper-scrollbar" id="wrapper-scrollbar">
					<div
						className="Wrapper-scrollbar-button"
						ref={btnScrollbar}
						id="wrapper-scrollbar-button"
					></div>
				</div>
				<div className="Wrapper-content" id="wrapper-content" ref={wrapperContent}>
					{children}
				</div>
			</div>
		</>
	);
};

export default Scrollbar;
