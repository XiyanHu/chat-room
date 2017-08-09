const DEFAULT_ROOM = "0"

export default function listenWebSocket( io, store ){
    io.on("connection", socket=>{
        console.log("one client connected")
        
        socket.emit("state", store.getState() )//给store发送state，store用getState()接受
        
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
    })
}