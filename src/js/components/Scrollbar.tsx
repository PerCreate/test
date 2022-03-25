import { debounce } from "js/utils/Utils";
import { RefObject, useEffect, useRef, useState } from "react";

const Scrollbar = ({ children }: { children: any }) => {
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
		obs.observe(wrapper.current as HTMLDivElement, { childList: true, subtree: true });
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
		const currentWrapper = wrapper.current as HTMLDivElement;
		const currentWrapperContent = wrapperContent.current as HTMLDivElement;
		const currentBtnScrollbar = btnScrollbar.current as HTMLDivElement;

		const visibleContentHeight: number = currentWrapper.offsetHeight;
		const contentHeight: number = currentWrapperContent.offsetHeight;

		setScrollbarHeight(visibleContentHeight);
		setP(visibleContentHeight / contentHeight);
		setBtnScrollbarHeight((visibleContentHeight / contentHeight) * visibleContentHeight);
		currentBtnScrollbar.style.height =
			(visibleContentHeight / contentHeight) * visibleContentHeight + "px";
	};

	const setCurrentPosition = () => {
		const currentWrapperContent = wrapperContent.current as HTMLDivElement;
		const currentBtnScrollbar = btnScrollbar.current as HTMLDivElement;

		const currentDeltaY = startMovingPosBtnY + (currentPosBtnY - startPosBtnY);
		const enableSpaceDown = scrollbarHeight - btnScrollbarHeight;

		if (isBtnDown) {
			if (currentDeltaY < 0) {
				currentBtnScrollbar.style.top = 0 + "px";
				currentWrapperContent.style.top = 0 + "px";
				return;
			}

			if (enableSpaceDown - currentDeltaY < 0) {
				currentBtnScrollbar.style.top = enableSpaceDown + "px";
				currentWrapperContent.style.top = -enableSpaceDown / P + "px";
				return;
			}
			currentBtnScrollbar.style.top = currentDeltaY + "px";
			currentWrapperContent.style.top = -currentDeltaY / P + "px";
			return;
		}

		if (isWheelEvent) {
			setIsWheelEvent(false);
			if (startPosBtnY < 0) {
				currentBtnScrollbar.style.top = 0 + "px";
				currentWrapperContent.style.top = 0 + "px";
				setStartPosBtnY(0);
				setStartMovingPosBtnY(0);
				return;
			}
			if (enableSpaceDown - startPosBtnY < 0) {
				currentBtnScrollbar.style.top = enableSpaceDown + "px";
				currentWrapperContent.style.top = -enableSpaceDown / P + "px";
				setStartPosBtnY(enableSpaceDown);
				setStartMovingPosBtnY(enableSpaceDown);
				return;
			}
			currentBtnScrollbar.style.top = startPosBtnY + "px";
			currentWrapperContent.style.top = -startPosBtnY / P + "px";
			setStartMovingPosBtnY(startPosBtnY);
			return;
		}
	};

	const btnScrollbarDown = (e: React.MouseEvent | React.TouchEvent) => {
		var currentPosition: number;
		const target = e.target as HTMLDivElement;

		if (target.id !== "wrapper-scrollbar-button" || e.type !== "touchstart") {
			return;
		} else {
			if (e.type === "touchstart") {
				e = e as React.TouchEvent;
				currentPosition = -e.changedTouches[0].clientY;
			} else {
				e = e as React.MouseEvent;
				currentPosition = e.clientY;
			}

			setStartPosBtnY(currentPosition);
			setCurrentPosBtnY(currentPosition);
			setIsBtnDown(true);
		}
	};

	const btnScrollbarMove = (e: React.MouseEvent | React.TouchEvent) => {
		if (e.type === "touchmove") {
			e = e as React.TouchEvent;
			setCurrentPosBtnY(-e.changedTouches[0].clientY);
			return;
		}
		e = e as React.MouseEvent;
		isBtnDown && setCurrentPosBtnY(e.clientY);
	};

	const btnScrollbarUp = (e: React.MouseEvent | React.TouchEvent) => {
		const currentBtnScrollbar = btnScrollbar.current as HTMLDivElement;

		setStartMovingPosBtnY(currentBtnScrollbar.offsetTop);
		setStartPosBtnY(currentBtnScrollbar.offsetTop);
		setIsBtnDown(false);
	};

	const wheelEvent = (e: React.WheelEvent) => {
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
				ref={wrapper as RefObject<HTMLDivElement>}
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
						ref={btnScrollbar as RefObject<HTMLDivElement>}
						id="wrapper-scrollbar-button"
					></div>
				</div>
				<div
					className="Wrapper-content"
					id="wrapper-content"
					ref={wrapperContent as RefObject<HTMLDivElement>}
				>
					{children}
				</div>
			</div>
		</>
	);
};

export default Scrollbar;
