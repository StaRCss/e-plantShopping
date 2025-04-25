import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.js'
import { HashRouter } from 'react-router-dom' // Import HashRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter> {/* ✅ Wrap in HashRouter */}
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
