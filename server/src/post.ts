import { PostRepository } from "./repositories/PostRepository"
import { SessionRepository } from "./repositories/SessionRepository"
import { RouteAction } from "./router"

export function createPostActions(sessionRepository: SessionRepository, postRepository: PostRepository) {
    const createPost: RouteAction = async (req, res) => {
        
        const sessionID = req.cookies?.get('sessionID')
        if (!sessionID) throw new Error("Log in first")
        const session = await sessionRepository.validateSession(sessionID, req.socket.remoteAddress!, req.headers["user-agent"])
        if (!req.body) throw new Error("You try to create empty post")
        console.log(`User ${session.username} try to create post`);

        
        const post = postRepository.createPost(session.username, req.body.content)
        res.statusCode = 200;
        res.writeHead(200, "Post created", { "Content-Type": 'application/json' })
        res.end()
    }

    const getPosts: RouteAction = async (req, res) => {
        console.log("Getting post for: " + req.socket.remoteAddress);
        const posts = await postRepository.getAllPosts()
        res.writeHead(200, "Post created", { "Content-Type": 'application/json' })
        
        res.write(JSON.stringify(posts))
        res.end()
    }

    return [createPost, getPosts]
}