import { Collection, ObjectId, WithId } from "mongodb";

export interface ISession {
    username: string;
    refreshed: Date;
    ip: string;
    userAgent: string;
}

export class SessionRepository {
    private collection: Collection<ISession>;
    private sessionCleaningJob?: NodeJS.Timer;
    constructor(collection: Collection<ISession>) {
        this.collection = collection
    }

    public async createSession(username: string, ip: string, userAgent: string = "") {
        const session = {
            username,
            refreshed: new Date(),
            ip,
            userAgent
        }
        const res = await this.collection.insertOne(session)
        return { ...session, _id: res.insertedId }
    }

    public async validateSession(_id: string, ip: string, userAgent: string = "") {
        const session = await this.collection.findOne({ _id: new ObjectId(_id), ip, userAgent })
        if (!session) throw new Error(`Invalid session ${_id}`)
        return session
    }

    public async refreshSession(session: WithId<ISession>) {
        await this.collection.findOneAndUpdate({ _id: session._id }, { $set: { refreshed: new Date() } })
    }

    public async endSession(session: WithId<ISession>) {
        this.collection.deleteOne({ _id: session._id })
    }

    public async closeExiredSessions() {
        const sessions = await this.collection.deleteMany({ createTime: { $lt: new Date(Date.now() - Number(process.env.SESSION_MAXAGE)) } })
    }

    public async startSessionJob() {
        if (this.sessionCleaningJob) this.stopSessionJob()
        this.sessionCleaningJob = setInterval(this.closeExiredSessions.bind(this), Number(process.env.SESSION_MAXAGE))
    }
    public async stopSessionJob() {
        this.sessionCleaningJob && clearInterval(this.sessionCleaningJob)
    }
}