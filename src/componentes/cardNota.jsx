import { useMain } from "@/app/context/mainContext";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const CardNota = ({ nota, id }) => {
  const { setNotaId, borrarEstaNota } = useMain();
  return (
    <div className="tarjeta" id={id}>
      <Link
        onClick={() => setNotaId(id)}
        href={"/Nota"}
        className="tarjeta__contenido"
      >
        <div className="tarjeta__contenido-encabezado">
          <p>{nota.slice(3, 20).trim()}</p>
        </div>
        <div
          className="tarjeta__contenido-cuerpo"
          dangerouslySetInnerHTML={{ __html: nota }}
        ></div>
        <div className="tarjeta__contenido-pie ">
          <p> 02:14pm </p>
        </div>
      </Link>
      <div className="tarjeta__acciones">
        <Link
          onClick={() => setNotaId(id)}
          href="/Nota"
          className="tarjeta__acciones-editar"
        >
          <AiFillEdit />
          <p>Edit</p>
        </Link>
        <div
          className="tarjeta__acciones-eliminar"
          onClick={() => borrarEstaNota(id)}
        >
          <AiFillDelete />
          <p>Delete</p>
        </div>
      </div>
    </div>
  );
};
export default CardNota;
