import { Server } from 'socket.io';

// Map to store user IDs and corresponding arrays of socket IDs
const userSocketMap = new Map();

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    // Access the user information from the handshake object
    const userId = socket.handshake.auth.user.id;

    console.log(`User connected with ID: ${socket.id}, User ID: ${userId}`);

    // Add the socket ID to the array for the user ID
    if (!userSocketMap.has(userId)) {
      userSocketMap.set(userId, [socket.id]);
    } else {
      const userSockets = userSocketMap.get(userId);
      userSockets.push(socket.id);
      userSocketMap.set(userId, userSockets);
    }

    socket.on('chat', (msg) => {
      console.log(`Message ${msg} from ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      // Remove the socket ID from the array for the user ID
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
    });
  });

  // Function to emit a message to all connections of a specific user
  const emitMessageToUser = (userId, message) => {
    const userSockets = userSocketMap.get(userId);
    if (userSockets) {
      userSockets.forEach((socketId) => {
        io.to(socketId).emit('privateMessage', message);
      });
    } else {
      console.log(`User with ID ${userId} not currently connected.`);
    }
  };

  // Make the function available for external use
  io.emitMessageToUser = emitMessageToUser;
};

// Usage example from another part of your server code
// To emit a private message to a user with ID '123'
// io.emitMessageToUser('123', 'Hello, this is a private message!');
