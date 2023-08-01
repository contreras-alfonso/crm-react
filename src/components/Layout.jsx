import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

  const location = useLocation()

  return (
    <div className='md:flex md:min-h-screen'>
      <aside className="md:w-1/12 bg-blue-950 py-10">
        <h2 className='font-bold text-white text-center'>CRM-CLIENTES</h2>

        <nav className='mt-10'>
          <Link title='Lista de clientes' className={`${location.pathname === '/' && 'border-l-4 bg-slate-700'} block mt-1 text-white hover:cursor-pointer p-3 text-center hover:bg-slate-700`} to="/"><i className="fa-light fa-users text-3xl"></i></Link>
          <Link title='Agrega un nuevo cliente' className={`${location.pathname === '/clientes/nuevo' && 'border-l-4 bg-slate-700'} block mt-1 text-white hover:cursor-pointer p-3 text-center hover:bg-slate-700`} to="/clientes/nuevo"><i className="fa-regular fa-user-plus text-3xl"></i></Link>
        </nav>

      </aside>
      <main className='md:w-11/12 p-10 md:h-screen md:overflow-y-scroll'>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Layout