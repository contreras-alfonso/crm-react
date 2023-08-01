import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../api/clientes";

export async function action({request}){
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

  await agregarCliente(datos);

  return redirect('/');
}

const NuevoCliente = () => {

  const errores = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-950'>Nuevo Cliente</h1>
      <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>
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
          <Formulario/>
          <input type="submit" className="mt-5 w-full bg-blue-950 p-3 text-white rounded hover:cursor-pointer" value="Registrar Cliente"/>
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente