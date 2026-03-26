import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Injeta o token JWT em toda requisição automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ss_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Se receber 401, limpa a sessão e volta para o login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ss_token')
      localStorage.removeItem('ss_user')
      window.location.reload()
    }
    return Promise.reject(err)
  }
)

// Auth
export const login  = (username, password) => api.post('/auth/login', { username, password })
export const getMe  = ()                   => api.get('/auth/me')
export const logout = ()                   => api.post('/auth/logout')

// Conversas
export const getConversations   = ()          => api.get('/conversations')
export const createConversation = (data)      => api.post('/conversations', data)
export const getConversation    = (id)        => api.get(`/conversations/${id}`)
export const deleteConversation = (id)        => api.delete(`/conversations/${id}`)
export const updateTitle        = (id, title) => api.put(`/conversations/${id}/title`, { title })
export const updateFile         = (id, name, content) => api.put(`/conversations/${id}/file`, { file_name: name, file_content: content })

// IA
export const uploadFile  = (formData)              => api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const sendMessage = (message, fileContent, conversationId) => api.post('/chat', { message, file_content: fileContent, conversation_id: conversationId })

export default api