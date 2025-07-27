import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/i18n.ts'
import axios from 'axios';

axios.defaults.baseURL = 'https://freshconnect-kuwy.onrender.com';

createRoot(document.getElementById("root")!).render(<App />);