import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./contexts/AuthContext.jsx";
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
  </AuthProvider>
)
