import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// после App: App.css подключается внутри App.tsx, новые стили должны идти за ним
import './styles/tokens.css'
import './styles/base.css'
import './styles/header.css'
import './styles/footer.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
