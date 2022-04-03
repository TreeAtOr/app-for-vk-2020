import { createReadStream, stat } from "fs";
import { RouteAction } from "./router";

export function createServePathAction(path: string): RouteAction {
    return (req, res) => stat(path, (err, ret) => {
        if (!err && ret.isFile()) {
            const readStream = createReadStream(path);
            readStream.pipe(res)
            readStream.once("end", () => {
                readStream.destroy()
                res.end()
            })
        }
        else {
            res.writeHead(404, "Unfound")
            res.end()
        }
    })
}