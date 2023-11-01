"use client";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const Nota = ({ nota, id, borrarEstaNota }) => {
  return (
    // <div className="ContenedorNotaIndividual">
    //     <Link href={`/Nota/Editar/${id}`}  id={id} dangerouslySetInnerHTML={{ __html: nota }} style={{ flex: 1 }}></Link>
    //     <input type="button" value="X" className="borrarEstaNota" onClick={()=>borrarEstaNota(id)} />
    // </div>

    <div class="tarjeta">
      <div class="tarjeta__contenido">
        <div class="tarjeta__contenido-encabezado">
          <p>Titulo</p>
        </div>
        <div class="tarjeta__contenido-cuerpo">texto ejemplo</div>
        <div class="tarjeta__contenido-pie ">
          <p> 02:14pm </p>
        </div>
      </div>
      <div class="tarjeta__acciones">
        <div class="tarjeta__acciones-editar">
          <AiFillEdit />
          <p>Edit</p>
        </div>
        <div class="tarjeta__acciones-eliminar">
          <AiFillDelete />
          <p>Delete</p>
        </div>
      </div>
    </div>
  );
};
export default Nota;
