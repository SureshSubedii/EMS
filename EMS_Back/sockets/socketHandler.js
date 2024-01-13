import { Server} from 'socket.io'
export  const  initializeSocket = (httpServer) =>{
    const io = new Server(httpServer, {
        cors: {
          origin: "http://localhost:5173",
          methods: ["GET", "POST"]
        }
      });    
      io.on('connection', (socket)=> {
       const id = socket.handshake.auth.user
        console.log(`User connected with ID: ${id}`);

        socket.on('chat', (msg)=> {
            console.log(`Message ${msg} from ${socket.id}`)
        })
        socket.emit
    })
}