import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import '../styles/login.css'

export default function Login() {
  const { signIn } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('Preencha usuario e senha.')
      return
    }

    // Simulando login ate o backend ficar pronto
    if (username === 'admin' && password === '1234') {
      signIn('token-fake', { username: 'admin' })
    } else {
      setError('Usuário não tem permissão para uso')
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg-art" aria-hidden="true">
        <div className="login-bg-kanji">新世界</div>
      </div>
      <div className="login-overlay" />

      <div className="login-card">
        <div className="login-logo">
          <span className="login-kanji">新世界</span>
          <h1 className="login-title">SHIN SEKAI I.A</h1>
          <p className="login-subtitle">Assistente de Analise de Documentos</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="login-field">
            <label htmlFor="user">Usuario</label>
            <input
              id="user"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Digite seu usuario"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="login-field">
            <label htmlFor="pass">Senha</label>
            <input
              id="pass"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && <div className="login-error">⚠️ {error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="spinner-sm" /> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}