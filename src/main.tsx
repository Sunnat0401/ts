import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Styles/index.css'
import App from './App.tsx'
import { ThemeProvider } from './Components/Providers/Them-providers.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './Components/Providers/AuthProvider.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'





const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient} >
    <ThemeProvider defaultTheme='dark'>
      <AuthProvider>
      <App />
      </AuthProvider>
    </ThemeProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
