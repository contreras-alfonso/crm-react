import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
import Index, { loader as clientesLoader } from './pages/Index'
import ErrorPage from './components/ErrorPage'
import EditarCliente, {loader as editarClienteLoader, action as editarClienteAction} from './pages/EditarCliente'
import {action as eliminarclienteAction} from './components/Cliente'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Index></Index>,
        loader: clientesLoader,
        errorElement: <ErrorPage></ErrorPage>
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente></NuevoCliente>,
        action: nuevoClienteAction,
      },
      {
        path: '/clientes/editar/:idCliente',
        element: <EditarCliente></EditarCliente>,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage></ErrorPage>
      },
      {
        path: '/clientes/eliminar/:idCliente',
        action: eliminarclienteAction,

      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
