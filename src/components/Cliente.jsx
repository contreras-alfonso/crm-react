import React from 'react'
import { useNavigate, Form, redirect } from 'react-router-dom';
import { eliminarcliente } from '../api/clientes';

export async function action({params}){
    await eliminarcliente(params.idCliente);
    return redirect('/');
}

const Cliente = ({cliente}) => {

    const navigate = useNavigate();

    const {nombre, empresa, email, telefono, id} = cliente;
  return (
    <tr className='border-b'>
        <td className="p-6">
            <p className='text-lg font-bold text-gray-800'>{nombre}</p>
            <p className='text-sm'>{empresa}</p>
        </td>

        <td className='p-6'>
            <p className='text-gray-600'><span className='text-gray-800 font-bold'>Email: </span>{email}</p>
            <p className='text-gray-600'><span className='text-gray-800 font-bold'>Telefono: </span>{telefono}</p>
        </td>

        <td className='p-6 flex flex-col gap-3'>

            <button type='button' className='text-white font-bold block bg-blue-950 w-full p-3 md:px-0 rounded-lg' onClick={()=>navigate(`/clientes/editar/${id}`)}>Editar</button>
            
         
            <Form method='POST' action={`/clientes/eliminar/${id}`} onSubmit={(e)=>{
                if(!confirm('¿Deseas eliminar este registro?')){
                    e.preventDefault();
                }
            }}>
                <button type='submit' className='text-red-500 font-bold block border border-red-500 w-full p-3 md:px-0 rounded-lg'>Eliminar</button>
            </Form>
          
        </td>
    </tr>
  )
}

export default Cliente