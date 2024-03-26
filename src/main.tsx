import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import './styles/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './routes/Login.tsx'
import '@fontsource-variable/lora'
import '@fontsource-variable/lora/wght-italic.css'
import '@fontsource-variable/montserrat'
import '@fontsource-variable/montserrat/wght-italic.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
