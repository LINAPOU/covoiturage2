import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});


let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (userExists) {
    // Ajouter un nouveau socketId si l'utilisateur est déjà connecté avec un autre appareil
    userExists.socketIds.push(socketId);
  } else {
    // Créer un nouvel utilisateur avec un tableau de socketIds
    onlineUser.push({ userId, socketIds: [socketId] });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.map((user) => {
    // Supprimer le socketId de l'utilisateur
    user.socketIds = user.socketIds.filter((id) => id !== socketId);
    return user;
  }).filter((user) => user.socketIds.length > 0); // Supprimer l'utilisateur s'il n'a plus de socketId
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log('User connected:', socket.id);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log("Users connected:", onlineUser);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver && receiver.socketIds.length > 0) {
      // Envoyer le message à tous les socketId du destinataire
      receiver.socketIds.forEach((socketId) => {
        io.to(socketId).emit("getMessage", data);
      });
    } else {
      // Gérer l'absence de l'utilisateur en ligne
      console.log(`Receiver ${receiverId} is not online`);
      // Vous pouvez envoyer une erreur ou une notification à l'expéditeur, selon vos besoins
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("User disconnected:", socket.id);
  });
});

