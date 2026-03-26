import { useState } from 'react'
import '../styles/sidebar.css'

export default function Sidebar({ open, onClose, conversations, currentId, onSelect, onNew }) {
  const [menuId, setMenuId] = useState(null)

  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="sb-kanji">新世界</span>
            <span>Chats</span>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="sidebar-list">
          {conversations.length === 0 ? (
            <div className="sidebar-empty">
              <p>Nenhuma conversa ainda.</p>
              <p>Clique em <strong>Novo Chat</strong> para comecar.</p>
            </div>
          ) : (
            conversations.map(conv => (
              <div
                key={conv.id}
                className={`conv-item ${conv.id === currentId ? 'active' : ''}`}
                onClick={() => { onSelect(conv.id); onClose() }}
              >
                <div className="conv-info">
                  <span className="conv-title">{conv.title}</span>
                  <span className="conv-meta">
                    {conv.message_count} msg{conv.message_count !== 1 ? 's' : ''}
                    {conv.file_name && <> · 📎 {conv.file_name}</>}
                  </span>
                </div>

                <div className="conv-menu-wrap" onClick={e => e.stopPropagation()}>
                  <button
                    className="conv-dots"
                    onClick={() => setMenuId(menuId === conv.id ? null : conv.id)}
                  >⋮</button>

                  {menuId === conv.id && (
                    <div className="conv-dropdown">
                      <button onClick={() => { alert('Renomear: ' + conv.id); setMenuId(null) }}>
                        ✏️ Renomear
                      </button>
                      <button className="danger" onClick={() => { alert('Excluir: ' + conv.id); setMenuId(null) }}>
                        🗑️ Excluir
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <button className="btn-primary full-width" onClick={() => { onNew(); onClose() }}>
            + Novo Chat
          </button>
        </div>
      </aside>

      {open && <div className="sidebar-backdrop" onClick={onClose} />}
    </>
  )
}