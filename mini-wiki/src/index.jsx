// index.jsx by Joe Wigdor
// AD300 Fall 2024
// Entry point for react app, describes the nested structure of services that support the application.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./contexts/AuthContext"
import './styles.css'
import App from './App'
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <AuthProvider>
      <BrowserRouter>
          <StrictMode>
              <App />
          </StrictMode>
      </BrowserRouter>
  </AuthProvider>
)
