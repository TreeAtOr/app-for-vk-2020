import { Collection } from "mongodb";

export interface IPost {
    author: string,
    content: string,
    createTime: Date
}

export class PostRepository {
    private collection: Collection<IPost>;
    constructor(collection: Collection<IPost>) {
        this.collection = collection
    }

    public async createPost(author: string, content: string,) {
        const post = {
            author,
            createTime: new Date(),
            content
        }
        return await this.collection.insertOne(post)
    }

    public async getAllPosts(from: number = 0, count: number = 20) {
        return await this.collection.find().sort({ createTime: -1 }).skip(from).limit(count).toArray()
    }
}