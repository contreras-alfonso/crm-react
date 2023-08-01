import { useLoaderData } from "react-router-dom"
import { obtenerClientes } from "../api/clientes";
import Cliente from "../components/Cliente";

export function loader(){
  const clientes = obtenerClientes();
  return clientes
}

const Index = () => {

  const datos = useLoaderData();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-950'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>

      {datos.length>0 ? (
        <div className="w-full max-sm:overflow-x-scroll">
        <table className="w-full bg-white shadow mt-5">
            <thead className="bg-blue-950">
              <tr>
                <th className="p-2 text-white">Cliente</th>
                <th className="p-2 text-white">Contacto</th>
                <th className="p-2 text-white">Acciones</th>
              </tr>
            </thead>

            <tbody>
                {datos.map(cliente=>(
                  <Cliente key={cliente.id} cliente={cliente}></Cliente>
                ))}
            </tbody>

        </table>
        </div>
      ): (
        <p className="text-center text-blue-950 font-black text-3xl mt-10">Aún no hay Clientes</p>
      )}
    </>
  )
}

export default Index