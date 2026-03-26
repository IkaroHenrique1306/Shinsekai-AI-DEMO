import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Chat  from './components/Chat'

function AppContent() {
  const { user } = useAuth()
  return user ? <Chat /> : <Login />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}