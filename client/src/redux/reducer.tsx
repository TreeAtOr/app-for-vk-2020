import { Reducer } from "@reduxjs/toolkit";
import { IPost } from "../interfaces";
import IAppActions, { AppActionTypes } from "./actions";


export interface IAppState {
    username?: string,
    posts: IPost[],
    popup?: { 
        header: string, 
        text?: string, 
    }
}

function Init(): IAppState {
    return { posts: [] }
}

const AppReducer: Reducer<IAppState, IAppActions> = (state: IAppState = Init(), action: IAppActions): IAppState => {
    switch (action.type) {
        case AppActionTypes.POST_UPDATED:
            return { ...state, posts: action.payload }
        case AppActionTypes.LOG_IN:
            return { ...state, username: action.payload.username }
        case AppActionTypes.LOG_OUT:
            return { ...state, username: undefined }
        case AppActionTypes.ALERT:
            return { ...state, popup: action.payload }
        default: return state;
    }
}

export default AppReducer;