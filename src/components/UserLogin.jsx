import React, { useState } from 'react'
import _ from 'lodash'

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#ece5dd',
}

const loginBoxStyle = {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
}

const buttonStyle = {
  width: '100%',
  height: 50,
  fontWeight: 'bold',
  borderRadius: 10,
  fontSize: 18,
  backgroundColor: '#075e54',
  borderWidth: 0,
  color: '#fff',
  margin: '10px 0',
  cursor: 'pointer',
}

const inputStyle = {
  margin: '10px 0',
  height: 30,
  width: '100%',
  borderRadius: 10,
  borderWidth: 1,
  padding: 10,
  fontSize: 13,
  boxSizing: 'border-box',
}

const buttonHoverStyle = {
  backgroundColor: '#064f3b',
}

export default function UserLogin({ setUser, setAvatar }) {
  const [user, setAUser] = useState("")
  const [isHovered, setIsHovered] = useState(false)

  function handleSetUser() {
    if (!user) return
    const avatar = `http://picsum.photos/id/${_.random(1, 1000)}/200/300`
    localStorage.setItem("user", user)
    localStorage.setItem("avatar", avatar)
    setUser(user)
    setAvatar(avatar)
  }

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <h1 style={{ margin: 10, fontFamily:'monospace' }}>WeChat</h1>
        <h3 style={{ margin: 10, fontFamily:'monospace' }}>"Your One-time Chat-App"</h3>
        <input
          style={inputStyle}
          value={user}
          onChange={e => setAUser(e.target.value)}
          placeholder="Write a random name"
        />
        <button
          onClick={handleSetUser}
          style={{ ...buttonStyle, ...(isHovered ? buttonHoverStyle : {}) }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Login
        </button>
      </div>
    </div>
  )
}
