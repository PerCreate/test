export function getPublicPath(): string {
	return process.env.PUBLIC_URL;
}

export function debounce(fn: Function, delay: number = 1000) {
	var timer: number;

	return function () {
		const context = this;
		const args = arguments;

		clearTimeout(timer);
		timer = window.setTimeout(() => {
			timer = null;
			fn.apply(context, args);
		}, delay);
	};
}