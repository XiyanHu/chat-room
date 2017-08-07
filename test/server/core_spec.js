import {expect} from "chai"
import {v1} from "uuid"
import {fromJS,Map,List} from "immutable"

import {
    addRoom,
    removeRoom
} from "../../src/server/core.js"

describe("rooms", ()=>{
    it("Can add room：addRoom",()=>{
        var firstRoom = {name:"first room",id:v1(), owner: "steven" }
        const nextState =  addRoom( undefined, firstRoom )
        const rooms = nextState.get("rooms")
        expect( rooms ).to.be.ok
        expect( rooms.get(0) ).to.equal(Map(firstRoom))

        const nextNextState = addRoom(nextState,{
            name:"second room",owner:"terry"
        })
        expect(nextNextState.getIn(["rooms",1,"name"])).to.equal("second room")
    
    })
    const mockState = fromJS({
        rooms: [{name:"first room",id:v1(), owner: "steven" }]
    })
    
    it("Can be removed by creator",()=>{
        const state =  removeRoom( mockState, { 
            id: mockState.getIn(["rooms",0,"id"]),
            user: "steven"
        })

        expect( state.get("rooms").size ).to.equal(0)//whether the size of state is zero
    })

    it("Can't be removed by others",()=>{
        const state =  removeRoom( mockState, { 
            id: mockState.getIn(["rooms",0,"id"]),
            user: "vido"//another one
        })
        
        expect( state.get("rooms").size ).to.equal(1)

    })
})