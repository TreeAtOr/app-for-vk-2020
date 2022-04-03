import { ServerResponse } from "http";
import { MongoClient } from "mongodb";
import { ParsedMessage } from ".";
import { createAuthActions } from "./auth";
import { createPostActions } from "./post";
import { PostRepository } from "./repositories/PostRepository";
import { SessionRepository } from "./repositories/SessionRepository";
import { createServePathAction } from "./static";

export type RouteAction = (req: ParsedMessage, res: ServerResponse) => void
export type Router = (route?: string) => RouteAction

export async function createAppRouter(): Promise<Router> {
    const client = new MongoClient(process.env.MONGO_URI!)
    await client.connect()

    const sessionStore = new SessionRepository(client.db().collection('sessions'))
    const postStore = new PostRepository( client.db().collection('posts'))

    const [login, refresh, logout] = createAuthActions(sessionStore)
    const [createPost, getPosts] = createPostActions(sessionStore, postStore)

    sessionStore.startSessionJob()

    return function router(route?: string): RouteAction {
        switch (route) {
            case '/auth/refresh': return refresh;
            case '/auth/login': return login;
            case '/auth/logout': return logout;

            case '/post/create': return createPost;
            case '/post/getAll': return getPosts;

            case '/': return createServePathAction(process.env.STATIC_FOLDER! + '/index.html')
            default: return createServePathAction(process.env.STATIC_FOLDER! + route)
        }
    }
}





