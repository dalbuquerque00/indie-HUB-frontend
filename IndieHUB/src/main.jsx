import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./vendor/normalize.css";
import "./vendor/index.css";
import App from './components/App/App/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
