import { createStore } from "redux"
import coreReducer from "./reducer"

import { fromJS } from "immutable"

// 默认状态 一开始默认状态会从服务器发送到客户端
export const DEFAULT_STATE = fromJS({
    rooms: [{
        name: "Public Room", id: "0"
    }],
})


export function makeStore(state = DEFAULT_STATE) {
    return createStore(coreReducer, state)
}