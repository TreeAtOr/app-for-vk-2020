import { ParsedMessage } from "..";

export function applyMiddleware(req: ParsedMessage, ...args: Array<(a: ParsedMessage) => ParsedMessage>) {
    let _req = req;
    args.forEach((middleware) => {
        _req = middleware(_req)
    })
    return _req
}