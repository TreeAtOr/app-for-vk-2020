import { ParsedMessage } from "..";

function parseCookies(req: ParsedMessage) {
    const map = new Map<string, string>();
    const cookieHeader = req.headers?.cookie;
    if (!cookieHeader) return map;

    cookieHeader.split(`;`).forEach(function (cookie: string) {
        let [name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        map.set(name, decodeURIComponent(value));
    });

    return map;
}

export function parseCookiesMiddleware(req: ParsedMessage): ParsedMessage {
    req.cookies = parseCookies(req);
    return req
}