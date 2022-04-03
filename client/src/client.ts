import { AppActionTypes } from "./redux/actions"
import { AppDispatch, RootState } from "./redux/store"

export class Client {
    static BACKEND_URL = "http://localhost:8070"

    private dispatch: AppDispatch;
    private getState: () => RootState

    constructor(dispatch: AppDispatch, getState: () => RootState) {
        this.dispatch = dispatch;
        this.getState = getState;
    }

    async login(username: string) {
        try {
            const res = await fetch(`/auth/login?username=${encodeURIComponent(username)}`, { credentials: 'same-origin' })
            if (res.status === 200) this.dispatch({ type: AppActionTypes.LOG_IN, payload: { username } })
            else this.dispatch({ type: AppActionTypes.LOG_IN, payload: { username } })
        } catch (error) {
            this.dispatch({ type: AppActionTypes.ALERT, payload: { header: "Ошибка связи с сервером..." } })
        }
    }

    async refresh() {
        try {
            const res = await fetch(`/auth/refresh`, { credentials: 'same-origin' })
            if (res.status !== 200) return;
            const { username } = await res.json()
            this.dispatch({ type: AppActionTypes.LOG_IN, payload: { username } })
        } catch (error) { }
    }

    async logout() {
        try {
            const res = await fetch(`/auth/logout`, { credentials: 'same-origin' })
            if (res.status === 200) this.dispatch({ type: AppActionTypes.LOG_OUT })
        } catch (error) {
            this.dispatch({ type: AppActionTypes.ALERT, payload: { header: "Ошибка связи с сервером..." } })
        }
    }

    async updatePosts() {
        const res = await fetch(`/post/getAll`, { credentials: 'same-origin' })
        console.log(res.status);
        try {
            const posts = await res.json()
            this.dispatch({ type: AppActionTypes.POST_UPDATED, payload: posts })
        } catch (error) {
            this.dispatch({ type: AppActionTypes.ALERT, payload: { header: "Ошибка связи с сервером..." } })
            /* this.dispatch({ type: AppActionTypes.POST_UPDATED, payload: [{
                author: "",
                content: "При загрузке постов произошла ошибка :(",
                createTime: new Date(),
                id: -1
            }] }) */
        }
    }
    async createPost(content: string) {
        const state = this.getState()
        if (!state.username) {
            console.error("You must be authorized")
            return state
        }
        const newPost = { content, }
        const res = await fetch(`/post/create`, {
            credentials: 'same-origin',
            method: "POST",
            body: JSON.stringify(newPost),
            headers: { "Content-Type": 'application/json' }
        })
        this.updatePosts()
    }
}
