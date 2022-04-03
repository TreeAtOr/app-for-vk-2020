import { createServer, IncomingMessage, ServerResponse } from "http";
import { createAppRouter } from "./router";
import * as dotenv from "dotenv"
import { parseURLMiddleware } from "./middleware/parseURL";
import { parseCookiesMiddleware } from "./middleware/parseCookies";
import { applyMiddleware } from "./middleware";


export type ParsedMessage = IncomingMessage & { cookies?: Map<string, string>, parsedURL?: URL, body?: any }

function withLoadedBody(req: ParsedMessage, res: ServerResponse, cb: () => void) {
    let body = ""
    req.on("data", (chunk) => body += chunk)
    req.on("end", () => {
        try { req.body = JSON.parse(body); } catch (e) { req.body = body }
        finally { cb() }
    })
}

async function withErrorInterception(req: ParsedMessage, res: ServerResponse, cb: () => any) {
    res.on("error", (err) => console.error(err));
    req.on("error", (err) => console.error(err));
    try { await cb() } catch (exeption) {
        if (exeption instanceof Error) {
            res.writeHead(500, exeption.message)
            res.end()
            console.error(exeption.message);
        }
    }
}


(async () => {
    dotenv.config()
    const router = await createAppRouter()
    const server = createServer((req, res) =>
        withLoadedBody(req, res, () =>
            withErrorInterception(req, res, async () => {
                const _req = applyMiddleware(req, parseURLMiddleware, parseCookiesMiddleware)
                const action = router(_req.parsedURL?.pathname)
                await action(_req, res)
    })))
    server.listen(process.env.PORT, () => console.log(`Server started at port ${process.env.PORT}`));
})()

