import { createStore } from "redux"
import coreReducer from "./reducer"

import {fromJS} from "immutable"

export const DEFAULT_STATE = fromJS({
    rooms:[{
        name:"Public Room", id:"0"
    }],
})

export function makeStore( state=DEFAULT_STATE ){
    return createStore( coreReducer, state )
}