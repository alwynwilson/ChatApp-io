import React, { useState } from 'react'
import { Button } from 'antd'
import { FaPaperPlane } from 'react-icons/fa'
import './style.css'

const styles = {
  button: {
    width: '10%',
    height: 50,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#064f3b',
    borderWidth: 0,
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textarea: {
    width: '90%', 
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
    fontSize: 18,
    boxSizing: 'border-box'
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
    marginTop: 400
  }
}

export default function InputText({ addMessage }) {
  const [message, setMessage] = useState('')

  const handleAddMessage = () => {
    if (message.trim()) {
      addMessage({ message })
      setMessage('')
    }
  }

  return (
    <div style={styles.textContainer}>
      <textarea
        style={styles.textarea}
        rows={6}
        placeholder="Write something..."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button
        onClick={handleAddMessage}
        style={styles.button}
      >
        <FaPaperPlane />
      </Button>
    </div>
  )
}
