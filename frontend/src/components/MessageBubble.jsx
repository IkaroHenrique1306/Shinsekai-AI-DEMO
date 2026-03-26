import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import '../styles/messages.css'

export default function MessageBubble({ sender, content, timestamp }) {
  const isUser = sender === 'user'
  const time   = timestamp
    ? new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <div className={`msg-wrap ${isUser ? 'user' : 'assistant'}`}>
      <div className="msg-avatar">{isUser ? '👤' : '🐉'}</div>

      <div className="msg-bubble">
        {isUser ? (
          <p className="msg-text">{content}</p>
        ) : (
          <div className="msg-markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="inline-code" {...props}>{children}</code>
                  )
                },
                table({ children }) {
                  return <div className="table-wrap"><table>{children}</table></div>
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        {time && <span className="msg-time">{time}</span>}
      </div>
    </div>
  )
}