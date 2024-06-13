import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from "socket.io-client";
import UserLogin from './UserLogin';
import InputText from '../components/InputText';
import { ChatBoxSender } from '../components/Chatbox';
import ChatBoxReciever from './Chatbox';

export default function ChatContainer() {
  const socketio = useRef(null);
  const [chats, setChats] = useState(JSON.parse(localStorage.getItem("chats")) || []);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));

  useEffect(() => {
    socketio.current = socketIOClient("https://ca-server-io.onrender.com");
    socketio.current.on('chat', senderChats => {
      setChats(senderChats);
      localStorage.setItem("chats", JSON.stringify(senderChats));
    });
    return () => {
      socketio.current.disconnect();
    };
  }, []);

  function sendChatToSocket(chat) {
    socketio.current.emit("chat", chat);
  }

  function addMessage(chat) {
    const newChat = { ...chat, user, avatar };
    const updatedChats = [...chats, newChat];
    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    sendChatToSocket(updatedChats);
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('avatar');
    localStorage.removeItem('chats');
    setUser("");
    setAvatar("");
    setChats([]);
  }

  function ChatsList() {
    return chats.map((chat, index) => {
      if (chat.user === user) return <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />;
      return <ChatBoxReciever key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />;
    });
  }

  return (
    <div>
      {user ? (
        <div>
          <div style={{ backgroundColor: '#064f3b', padding: 10, paddingBottom: 0, paddingTop: 0, display: 'flex', alignItems: 'center', borderRadius: 10, marginTop:'0px'}}>
            <img src={avatar} alt="Avatar" style={{ width:40, height: 40, borderRadius: '50%', marginRight: 10 }} />
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <h4 style={{ color: 'white', fontWeight: 900, fontFamily: "sans-serif", fontSize: '18px' }}>{user}</h4>
              <button onClick={logout} style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', cursor: 'pointer', padding: '5px 20px', borderRadius: 5, marginLeft: 'auto', marginRight: 20 }}>
                Log Out
              </button>
            </div>
          </div>

          <ChatsList />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} setAvatar={setAvatar} />
      )}
    </div>
  );
}
