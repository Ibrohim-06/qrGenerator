import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ContextApi } from './context/index.jsx'

createRoot(document.getElementById('root')).render(
    <ContextApi>
        <App />
    </ContextApi>
)
