import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Store from './Store/Store.jsx'
import { ToastContainer } from 'react-toastify'
import {Provider} from "react-redux"
createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
    <ToastContainer position="top-center"/>
  </Provider>

)
