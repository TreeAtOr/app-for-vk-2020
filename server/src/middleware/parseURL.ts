import { ParsedMessage } from "..";

export function parseURLMiddleware(req: ParsedMessage): ParsedMessage {
    if (!req.url) return req;
    req.parsedURL = new URL(req.url, `http://${req.headers.host}`);
    return req
}