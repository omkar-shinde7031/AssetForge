//#region node_modules/cookie-es/dist/index.mjs
function splitSetCookieString(cookiesString) {
	if (Array.isArray(cookiesString)) return cookiesString.flatMap((c) => splitSetCookieString(c));
	if (typeof cookiesString !== "string") return [];
	const cookiesStrings = [];
	let pos = 0;
	let start;
	let ch;
	let lastComma;
	let nextStart;
	let cookiesSeparatorFound;
	const skipWhitespace = () => {
		while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
		return pos < cookiesString.length;
	};
	const notSpecialChar = () => {
		ch = cookiesString.charAt(pos);
		return ch !== "=" && ch !== ";" && ch !== ",";
	};
	while (pos < cookiesString.length) {
		start = pos;
		cookiesSeparatorFound = false;
		while (skipWhitespace()) {
			ch = cookiesString.charAt(pos);
			if (ch === ",") {
				lastComma = pos;
				pos += 1;
				skipWhitespace();
				nextStart = pos;
				while (pos < cookiesString.length && notSpecialChar()) pos += 1;
				if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
					cookiesSeparatorFound = true;
					pos = nextStart;
					cookiesStrings.push(cookiesString.slice(start, lastComma));
					start = pos;
				} else pos = lastComma + 1;
			} else pos += 1;
		}
		if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.slice(start));
	}
	return cookiesStrings;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/ssr/headers.js
function toHeadersInstance(init) {
	if (init instanceof Headers) return init;
	else if (Array.isArray(init)) return new Headers(init);
	else if (typeof init === "object") return new Headers(init);
	else return null;
}
function mergeHeaders(...headers) {
	return headers.reduce((acc, header) => {
		const headersInstance = toHeadersInstance(header);
		if (!headersInstance) return acc;
		for (const [key, value] of headersInstance.entries()) if (key === "set-cookie") splitSetCookieString(value).forEach((cookie) => acc.append("set-cookie", cookie));
		else acc.set(key, value);
		return acc;
	}, new Headers());
}
//#endregion
export { mergeHeaders as t };
