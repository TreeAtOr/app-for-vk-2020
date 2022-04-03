import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Client } from "../client";
import { IAppState } from "../redux/reducer";
import { AppDispatch, RootState } from "../redux/store";

export function useClient() {
    const dispatch = useDispatch<AppDispatch>()
    const state = useSelector<RootState, IAppState>((state) => state)
    return new Client(dispatch, () => state)
}