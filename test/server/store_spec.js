import {fromJS} from "immutable"
import {expect} from "chai"

import {addRoom} from "../../src/server/actionCreator.js"
import {makeStore} from "../../src/server/store.js"

describe("server store",()=>{
    
    it("dispatch actions", ( done )=>{
        const  mockState = fromJS({
            rooms:[]
        })
        const store = makeStore( mockState )

        store.subscribe(()=>{
            const state = store.getState()
            expect( state.get("rooms").size ).to.equal(1)
            done()// 通知Mocha测试结束
        })

        store.dispatch( addRoom({
            name:"Chat room",owner:"jerry"
        }) )
    })
})