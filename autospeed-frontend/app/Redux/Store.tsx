'use client'

import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import AddtoCartReducer from "./Reducer";

const Store = createStore(
    combineReducers({

        addtocartreducer: AddtoCartReducer

    }), applyMiddleware(thunk)
)

export default Store