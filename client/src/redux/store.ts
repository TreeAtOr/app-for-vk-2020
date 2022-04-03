import { configureStore, createStore } from '@reduxjs/toolkit'
import AppReducer from './reducer'

export const store = createStore(AppReducer)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


