import ReactDOM from "react-dom"
import React from "react"
import App from "./components/App"


import {socket} from "./io"

socket.on("state",state => {
    console.log( "getInitialState:", state )
})


import {fromJS,Map,List} from "immutable"


const fakeState = {
	rooms:fromJS([
		{id:"0", name:"room1",owner:"steven"},
		{id:"1", name:"room2",owner:"jeff"},
	]),
	currentRoom: "1",
	username: "steven",
	messages:fromJS({
		"1":[
			{user:"steven",content:"Hi, what's up",time:"08:55"},
			{user:"jeff",content:"Great.",time:"09:12"},
		]
	})
}

var $app = document.getElementById("app")

function render(){
	ReactDOM.render(
		<App rooms={fakeState.rooms}
		 messages={fakeState.messages}
		 currentRoom={fakeState.currentRoom}
		 username={fakeState.username}
		/>,
		$app
	)
}

render()