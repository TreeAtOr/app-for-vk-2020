import { IPost } from "../interfaces"

export enum AppActionTypes {
    POST_UPDATED,
    LOG_IN,
    LOG_OUT,
    ALERT
}

export interface IPostsUpdatedAction {
    type: AppActionTypes.POST_UPDATED,
    payload: IPost[]
}

export interface ILogInAction {
    type: AppActionTypes.LOG_IN,
    payload: { username: string }
}

export interface ILogOutAction {
    type: AppActionTypes.LOG_OUT
}


export interface IShowAlertAction {
    type: AppActionTypes.ALERT
    payload: { header: string, text?: string }
}

type IAppActions = IPostsUpdatedAction | ILogInAction | ILogOutAction | IShowAlertAction
export default IAppActions 