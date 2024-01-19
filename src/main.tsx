import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { veiculoApi } from './features/api/apiSlice.ts'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider api={veiculoApi}>
        <App />
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>,

)
