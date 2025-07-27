import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AgentAuthProvider } from './contexts/AgentAuthContext'
import { GlobalLoadingProvider } from './contexts/GlobalLoadingContext'

createRoot(document.getElementById("root")!).render(
  <GlobalLoadingProvider>
    <AgentAuthProvider>
      <App />
    </AgentAuthProvider>
  </GlobalLoadingProvider>
);
