import { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import { AuthContext } from "../../Context/AuthContext";
import AxiosApi from "../../Lib/AxiosApi";
import { SocketContext } from "../../Context/SocketContext";
import { NotificationStore } from "../../Lib/notificationstore";
import { useParams } from "react-router-dom";

function Chat() {

  const [chats, setChats] = useState([]); // Tous les chats
  const [chat, setChat] = useState(null); // Chat actuellement ouvert  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await AxiosApi.get("/chat");
        setChats(res.data);
        console.log("📥 Chats récupérés :", res.data);
      } catch (err) {
        console.error("❌ Erreur lors du fetch des chats :", err);
      }
    };

    fetchChats();
  }, []);
   
  const messageEndRef = useRef();
  const decrease = NotificationStore((state) => state.decrease);
  console.log("🧍 currentUser :", currentUser);
  console.log("💬 chats :", chats);
  // Scroll vers le bas quand un message est ajouté
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Fonction pour ouvrir un chat spécifique
  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await AxiosApi("/chat/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease(); // Diminue les notifications non lues
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.error("Error loading chat: ", err);
    }
  };

  // Fonction pour envoyer un message
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
  
    try {
      const res = await AxiosApi.post("/contact/" + chat.id, { message: text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.error("Error sending message: ", err);
      alert("An error occurred while sending the message. Please try again.");
    }
  };

  // Gérer la réception des messages en temps réel via socket
  useEffect(() => {
    if (!socket || !chat) return;

    const read = async () => {
      try {
        await AxiosApi.put("/chat/read/" + chat.id);
      } catch (err) {
        console.error("Error marking chat as read: ", err);
      }
    };

    socket.on("getMessage", (data) => {
      if (chat.id === data.chatId) {
        setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
        read();
      }
    });

    return () => {
      socket.off("getMessage"); // Enlever l'écouteur d'événement pour éviter les fuites de mémoire
    };
  }, [socket, chat]);
  return (
    <div className="chatPage-container">
      <div className="chatPage-messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="chatPage-message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver.avatar || "/user.png"} alt="" />
            <div>
              <span>{c.receiver.username}</span>
              <p>{c.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatPage-chatBox">
          <div className="chatPage-top">
            <div className="chatPage-user">
              <img src={chat.receiver.avatar || "noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="chatPage-close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="chatPage-center">
            {chat.messages.map((message) => {
              const isCurrentUser = message.userId === currentUser.id;

              return (
                <div
                  className={`chatPage-chatMessage ${
                    isCurrentUser
                      ? "chatPage-message-sent"
                      : "chatPage-message-received"
                  }`}
                  key={message.id}
                >
                  <p>{message.message}</p>
                  <span>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              );
            })}

            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="chatPage-bottom">
            <textarea name="text" rows="2" placeholder="Écris un message..." />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
