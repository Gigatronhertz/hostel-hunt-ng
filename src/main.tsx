import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AgentAuthProvider } from './contexts/AgentAuthContext'

createRoot(document.getElementById("root")!).render(
  <AgentAuthProvider>
    <App />
  </AgentAuthProvider>
);
