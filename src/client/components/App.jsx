import React,{ Component } from "react"

import MessageList from "./MessageList"
import InputBox from "./InputBox"
import RoomList from "./RoomList"
// import { newMessage, switchRoom, addRoom,removeRoom } from "../actionCreators"

class App extends Component {
    getCurrentRoomName(){
        if(!this.props.currentRoom ) return "No"
        const room = this.props.rooms.find(r=>r.get("id") === this.props.currentRoom )
        return ( room && room.get ) ? room.get("name") : room
    }

    isOwner( ){
        if(!this.props.currentRoom || !this.props.username ) return false
        const room = this.props.rooms.find(r=>r.get("id") === this.props.currentRoom )
        if(!room) return false;
        return room.get("owner") == this.props.username
    }

    getMessages(){
        return this.props.messages ?
            this.props.messages.get(this.props.currentRoom) :  []
    }
    addRoom(){

    }

    removeRoom(){

    }

    sendMessage(message){

    }
    render(){
        const { currentRoom, rooms, username, dispatch } = this.props

        return (
            <div className="flex-row">
                <nav id="chat-nav">
                    <p>Room List</p>
                    <RoomList rooms={ rooms } 
                        currentRoom={currentRoom} 
                        switchRoom={ id => dispatch( switchRoom(id) )}
                    />
                    <button className="btn color-2" 
                        onClick={ this.addRoom.bind(this) }> + Create a new room</button>
                </nav>
                { !currentRoom ? <h2>Please select a room</h2>:
                    <section id="chat-main" className="flex">
                        <header className="flex-row">
                            <h3>Current room：{ this.getCurrentRoomName() }</h3>
                            <span className="flex"></span>
                            { !this.isOwner() ? "": 
                                <button onClick={this.removeRoom.bind(this)} 
                                className="btn sm color-5">X Delete this room</button>
                            }
                        </header>
                        <MessageList messages={ this.getMessages() } username={username} />
                        <InputBox sendMessage={this.sendMessage.bind(this)}/>
                    </section>
                }
            </div>
        )
    }
}


import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from "react-mixin";
reactMixin.onClass(App, PureRenderMixin )

export default App