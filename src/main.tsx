import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles/index.css'
import App from './App.tsx'
import { ThemeProvider } from './Components/Providers/Them-providers.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider defaultTheme='dark'>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
