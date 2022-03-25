export function getPublicPath(): string {
	return process.env.PUBLIC_URL || '';
}

export function getPathToAssets(): string {
	return getPublicPath() + '/assets';
}

export function getAPI(path: string, query: string): string {
	return `https://api.themoviedb.org/3/
	${path}?api_key=${getAPIKey()}${query}`;
}

export function getBaseURL(): string {
	return `http://image.tmdb.org/t/p`;
}

export function getAPIKey(): string {
	return '8716298d0f637e7824814450f22d60e7';
}

export function debounce(fn: Function, delay: number = 1000) {
	var timer: number;

	return function cb() {
		const context = this;
		const args = arguments;
		clearTimeout(timer);
		timer = window.setTimeout(() => {
			fn.apply(context, args);
		}, delay);
	};
}

export function getRandomId(): number {
	const value = Math.random();

	return value * (10 ** String(value).length);
}

export function deepCopy(obj: Object | Array<any>) {
	return JSON.parse(JSON.stringify(obj));
}

export function isMobDevice970(): boolean {
	const isMobile = window.matchMedia("only screen and (max-width: 970px)").matches;

	return isMobile;
}

export function isMobDevice780(): boolean {
	const isMobile = window.matchMedia("only screen and (max-width: 780px)").matches;

	return isMobile;
}

export function isViewportMiddleSize(): boolean {
	const isViewportMiddleSize = window.matchMedia("(max-width: 1320px)").matches;

	return isViewportMiddleSize;
}

export function isViewportSmallerSize(): boolean {
	const isViewportMiddleSize = window.matchMedia("(max-width: 1035px)").matches;

	return isViewportMiddleSize;
}