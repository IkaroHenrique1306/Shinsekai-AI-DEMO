import { useRef, useState } from 'react'
import UserMenu from './UserMenu'
import Sidebar from './Sidebar'
import MessageBubble from './MessageBubble'
import dragon from '../assets/dragon.png'
import '../styles/chat.css'

export default function Chat() {
  const [sidebarOpen, setSidebarOpen]     = useState(false)
  const [conversations, setConversations] = useState([])
  const [currentId, setCurrentId]         = useState(null)
  const [messages, setMessages]           = useState([])
  const [input, setInput]                 = useState('')
  const [loading, setLoading]             = useState(false)
  const bottomRef   = useRef(null)
  const textareaRef = useRef(null)
  const fileRef     = useRef(null)

  const currentConv = conversations.find(c => c.id === currentId)

  const addMessage = (sender, content) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      sender,
      content,
      timestamp: new Date().toISOString()
    }])
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading || !currentConv) return

    addMessage('user', text)
    setInput('')
    setLoading(true)

    // Simula resposta da IA por enquanto
    setTimeout(() => {
      addMessage('assistant', `Voce disse: **${text}**\n\nEm breve o backend estara conectado aqui.`)
      setLoading(false)
    }, 1000)
  }

  const handleNewChat = () => {
    const nova = {
      id: Date.now(),
      title: 'Nova Conversa',
      message_count: 0,
      file_name: null
    }
    setConversations(prev => [nova, ...prev])
    setCurrentId(nova.id)
    setMessages([])
  }

  const handleSelect = (id) => {
    setCurrentId(id)
    setMessages([])
  }

  return (
    <div className="chat-app">

      <div className="chat-bg-wrap" aria-hidden="true">
        <img src={dragon} alt="" className="chat-bg-img" />
      </div>
      <div className="chat-bg-overlay" />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        currentId={currentId}
        onSelect={handleSelect}
        onNew={handleNewChat}
      />

      <div className="chat-layout">

        <header className="chat-header">
          <button className="icon-btn" onClick={() => setSidebarOpen(true)} title="Menu">☰</button>

          <div className="chat-header-center">
            <h1 className="chat-title">SHIN SEKAI I.A</h1>
            {currentConv && (
              <div className="chat-subtitle">
                <span className="chat-conv-name">{currentConv.title}</span>
              </div>
            )}
          </div>

          <div className="chat-header-right">
            <span className="header-kanji" aria-hidden="true">新世界</span>
            <UserMenu />
          </div>
        </header>

        <main className="chat-messages">
          {!currentConv ? (
            <div className="chat-welcome">
              <span className="welcome-icon">🐉</span>
              <h2>Bem-vindo ao Shin Sekai I.A</h2>
              <p>Selecione uma conversa ou crie uma nova para comecar.</p>
              <button className="btn-primary" onClick={handleNewChat}>+ Novo Chat</button>
            </div>
          ) : messages.length === 0 ? (
            <div className="chat-welcome">
              <span className="welcome-icon">📄</span>
              <h2>{currentConv.title}</h2>
              <p>Envie um arquivo ou faca uma pergunta para comecar.</p>
            </div>
          ) : (
            messages.map(msg => (
              <MessageBubble
                key={msg.id}
                sender={msg.sender}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))
          )}

          {loading && (
            <div className="msg-wrap assistant">
              <div className="msg-avatar">🐉</div>
              <div className="msg-bubble typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </main>

        <footer className="chat-footer">
          <input type="file" ref={fileRef} style={{ display: 'none' }} />
          <button
            className="upload-btn"
            onClick={() => fileRef.current?.click()}
            title="Enviar arquivo"
            disabled={!currentConv}
          >
            📁
          </button>

          <textarea
            ref={textareaRef}
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={currentConv ? 'Digite sua pergunta... (Enter envia, Shift+Enter quebra linha)' : 'Selecione ou crie uma conversa...'}
            rows={1}
            disabled={!currentConv || loading}
          />

          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim() || !currentConv || loading}
            title="Enviar"
          >
            ➤
          </button>
        </footer>

      </div>
    </div>
  )
}