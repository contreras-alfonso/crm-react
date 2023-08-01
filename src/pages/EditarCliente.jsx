import { obtenerCliente, actualizarCliente } from "../api/clientes";
import { useLoaderData, Form , useNavigate, useActionData, redirect} from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

export async function loader({params}){
    const cliente = await obtenerCliente(params.idCliente);
    if(!cliente.id){
        throw new Response('',{
            status: 404,
            statusText: 'No hay resultados',
        })

        return;
    }
    return cliente
}

export async function action({request,params}){
    const formData = await request.formData();
  const datos = Object.fromEntries(formData);

  
  const errores = []

  
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(datos.email)){
    errores.push('Ingresa un email válido.');
  }

  if(Object.values(datos).includes('')){
    errores.push('Todos los campos son obligatorios');
  }

  //Retornar datos si hay errores

  if(errores.length){
    return errores
  }

  await actualizarCliente(params.idCliente,datos);

  return redirect('/');
}

const EditarCliente = () => {

    const cliente = useLoaderData();
    const navigate = useNavigate();
    const errores = useActionData();

  return (
    <>
       <h1 className='font-black text-4xl text-blue-950'>Editar cliente</h1>
        <p className='mt-3'>A continuación podras editar los datos de un cliente</p>
        <div className='flex justify-end'>
            <button className='bg-blue-950 text-white rounded-md px-3 py-1' onClick={()=>navigate(-1)}>Regresar</button>
        </div>

        <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">

            {errores?.length && errores.map((error,key)=>{
            return(
                <Error key={key} error={error}/>
            )
            })}

            <Form method="post" noValidate>
            <Formulario cliente={cliente}/>
            <input type="submit" className="mt-5 w-full bg-blue-950 p-3 text-white rounded hover:cursor-pointer" value="Guardar cambios"/>
            </Form>
        </div>
    </>
  )
}

export default EditarCliente