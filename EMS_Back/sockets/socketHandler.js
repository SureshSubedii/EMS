import { Server} from 'socket.io'
import User from '../schemas/userSchema.js'
const userSocketMap = new Map();
let admin = null;

export  const  initializeSocket = (httpServer) =>{
    const io = new Server(httpServer, {
        cors: {
          origin: "http://localhost:5173",
          methods: ["GET", "POST"]
        }
      });    
      io.on('connection',  (socket)=> {
       const userId = socket.handshake.auth.user

         User.findOne({ _id: userId }).then((user)=>{
       if (user?.role === 1){
        admin = userId
      }
      socket.emit('admin-online', { message: admin? true : false });

    // console.log( user?.email,user.role, admin, userSocketMap, "admin", admin)



       })



        if (!userSocketMap.has(userId)) {
          userSocketMap.set(userId, [socket.id]);
     

        } else {
         let  userSockets = userSocketMap.get(userId);
          userSockets.push(socket.id);
          userSocketMap.set(userId, userSockets);
        }
       

        

        socket.on('disconnect', (msg)=> {
          console.log(`Disconnect ${msg} from ${socket.id}`)
          if(admin == userId){
            admin = null
          }
          if (userSocketMap.has(userId)) {
            const userSockets = userSocketMap.get(userId);
            const index = userSockets.indexOf(socket.id);
            if (index !== -1) {
              userSockets.splice(index, 1);
              if (userSockets.length === 0) {
                userSocketMap.delete(userId);
              } else {
                userSocketMap.set(userId, userSockets);
              }
            }
          }

      }
      
      
      )
    })
}