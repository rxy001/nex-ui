import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NexUIProvider } from '@nex-ui/react'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NexUIProvider>
      <App />
    </NexUIProvider>
  </StrictMode>,
)
