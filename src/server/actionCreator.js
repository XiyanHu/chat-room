

export function addRoom( room ){
    return {
        type:"ADD_ROOM",room: room 
    }
}

export function removeRoom( payload ){
    return {
        type:"REMOVE_ROOM",payload: payload 
    }
}


export function newMessage(){
    return {
        type:"NEW_MESSAGE"
    }
}

export function switchRoom(){
    return {
        type:"SWITCH_ROOM"
    }
}
