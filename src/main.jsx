import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Main from './Context/Main.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Main>
    <App />
  </Main>,
)
