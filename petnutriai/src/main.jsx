import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

console.log('Main.jsx mounting...');

import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ErrorBoundary>
    </StrictMode>,
)
