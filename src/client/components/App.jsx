import React, { Component } from "react"

import MessageList from "./MessageList"
import InputBox from "./InputBox"
import RoomList from "./RoomList"
import { newMessage, switchRoom, addRoom, removeRoom, setUsername } from "../actionCreators"

if (process.env.NODE_ENV === "test") { }
else
    require("../css/style.css")

class App extends Component {
    getCurrentRoomName() {
        if (!this.props.currentRoom) return "无"
        const room = this.props.rooms.find(r => r.get("id") === this.props.currentRoom)
        return (room && room.get) ? room.get("name") : room
    }

    isOwner() {
        if (!this.props.currentRoom || !this.props.userId) return false
        const room = this.props.rooms.find(r => r.get("id") === this.props.currentRoom)
        if (!room) return false;
        return room.get("owner") == this.props.userId
    }

    getMessages() {
        return this.props.messages ?
            this.props.messages.get(this.props.currentRoom) : []
    }
    addRoom() {
        var name = prompt("房间名称")
        if (!name) return alert("不能没有房间名称")
        this.props.dispatch(addRoom({
            name, owner: this.props.userId
        }))
    }

    removeRoom() {
        this.props.dispatch(switchRoom())

        this.props.dispatch(removeRoom(this.props.currentRoom, this.props.userId))
    }

    sendMessage(message) {
        this.props.dispatch(newMessage({
            roomId: this.props.currentRoom,
            user: this.props.username,
            content: message,
            userId: this.props.userId,
        }))
    }

    setUsername() {
        let name = prompt("用名称") || "匿名"
        this.props.dispatch(setUsername(name, this.props.userId))
    }

    render() {
        const { currentRoom, rooms, username, userId, dispatch } = this.props

        return (
            <div className="flex-row">
                <nav id="chat-nav">
                    <p>Room List</p>
                    <RoomList rooms={rooms}
                        currentRoom={currentRoom}
                        switchRoom={id => dispatch(switchRoom(id))}
                    />
                    <button className="btn color-2"
                        onClick={this.addRoom.bind(this)}> + Create a new room</button>
                    <button className="btn color-3" style={{ marginTop: 10 }}
                        onClick={this.setUsername.bind(this)}> + 修改用户名</button>
                </nav>
                {!currentRoom ? <h2>Please select a room</h2> :
                    <section id="chat-main" className="flex">
                        <header className="flex-row">
                            <h3>Current Room：{this.getCurrentRoomName()}</h3>
                            <span className="flex"></span>
                            {!this.isOwner() ? "" :
                                <button onClick={this.removeRoom.bind(this)}
                                    className="btn sm color-5">X Delete this room</button>
                            }
                        </header>
                        <MessageList messages={this.getMessages()} username={username} userId={userId} />
                        <InputBox sendMessage={this.sendMessage.bind(this)} />
                    </section>
                }
            </div>
        )
    }
}


import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from "react-mixin";
reactMixin.onClass(App, PureRenderMixin)

import { connect } from 'react-redux'
function mapStateToProps(state) {
    return {
        rooms: state.get("rooms"),
        currentRoom: state.get("currentRoom"),
        username: state.get("username"),
        messages: state.get("messages"),
        userId: state.get("userId")
    }
}

export const ConnectApp = connect(mapStateToProps)(App)

export default App