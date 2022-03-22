export function getPublicPath(): string {
	return process.env.PUBLIC_URL;
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

	return function () {
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