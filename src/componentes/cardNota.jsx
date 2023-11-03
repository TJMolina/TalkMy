'use client';
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const Nota = ({ nota, id, borrarEstaNota }) => {
  return (
    <div className="tarjeta" id={id}>
      <Link href={`/Nota/${id}`} className="tarjeta__contenido">
        <div className="tarjeta__contenido-encabezado">
          <p>Titulo</p>
        </div>
        <div className="tarjeta__contenido-cuerpo" dangerouslySetInnerHTML={{ __html: nota }}></div>
        <div className="tarjeta__contenido-pie ">
          <p> 02:14pm </p>
        </div>
      </Link>
      <div className="tarjeta__acciones">
        <Link href={`/Nota/${id}`} className="tarjeta__acciones-editar">
          <AiFillEdit />
          <p>Edit</p>
        </Link>
        <div className="tarjeta__acciones-eliminar"  onClick={()=>borrarEstaNota(id)}>
          <AiFillDelete />
          <p>Delete</p>
        </div>
      </div>
    </div>
  );
};
export default Nota;
