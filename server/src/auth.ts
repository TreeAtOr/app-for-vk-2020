import { SessionRepository } from "./repositories/SessionRepository"
import { RouteAction } from "./router"

export const createAuthActions = (sessionStore: SessionRepository) => {
    const login: RouteAction = async (req, res) => {
        const username = req.parsedURL?.searchParams.get("username")
        console.log(`User ${username} try to login`);
        if (!username) throw new Error("Invalid username")
        const session = await sessionStore.createSession(username, req.socket.remoteAddress!, req.headers["user-agent"])
        res.writeHead(200, "Authorized", { "Set-Cookie": `sessionID=${session._id};Httponly;Path=/` })
        res.end()
    }

    const refresh: RouteAction = async (req, res) => {
        const id = req.cookies?.get('sessionID')
        if (!id) throw new Error("Invalid id")
        const session = await sessionStore.validateSession(id, req.socket.remoteAddress!, req.headers["user-agent"])
        sessionStore.refreshSession(session)
        res.writeHead(200, "Authorized", { "Set-Cookie": `sessionID=${session._id};Httponly;Path=/` })
        res.write(JSON.stringify(session))
        res.end()
    }

    const logout: RouteAction = async (req, res) => {
        const id = req.cookies?.get('sessionID')
        if (!id) throw new Error("Invalid id")
        const session = await sessionStore.validateSession(id, req.socket.remoteAddress!, req.headers["user-agent"])
        sessionStore.endSession(session);
        res.writeHead(200, "Loged out", { "Set-Cookie": `sessionID=${session._id}; Max-Age=-1` })
        res.end()
    }

    return [login, refresh, logout]
}