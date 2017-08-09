import {expect} from "chai"
import {v1} from "uuid"
import {fromJS,Map,List} from "immutable"

import coreReducer from "../../src/server/reducer"//{}：export no {}: export default
import {addRoom,removeRoom} from "../../src/server/actionCreator.js"

describe("server side core Reducer",()=>{
    
    it("can be a reducer",()=>{
        var id = v1()
        var actions = [
            {type:"ADD_ROOM",room:{id,name:"1",owner:"steven"}},
            {type:"ADD_ROOM",room:{name:"2",owner:"vido"}},
            {type:"ADD_ROOM",room:{name:"3",owner:"steven"}},
            {type:"REMOVE_ROOM",payload:{id:id,user:"steven"}},
        ]
        const finalState = actions.reduce( coreReducer, undefined )
        console.log(finalState)
        console.log(finalState)
        expect(finalState.get("rooms").size).to.equal(2)
        expect(finalState.getIn(["rooms",0,"owner"])).to.equal("vido")
        expect(finalState.getIn(["rooms",1,"owner"])).to.equal("steven")
    })

    it("Use actionCreator",()=>{
        var id = v1()
        var actions = [
            addRoom({id,name:"1",owner:"jack"}),
            addRoom({name:"2",owner:"nathan"}),
            addRoom({name:"3",owner:"jack"}),
            removeRoom({id:id,user:"jack"}),
        ]
        const finalState = actions.reduce( coreReducer, undefined )
        console.log(finalState)
        expect(finalState.get("rooms").size).to.equal(2)
        expect(finalState.getIn(["rooms",0,"owner"])).to.equal("nathan")

    })





})




