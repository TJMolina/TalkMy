import { useMain } from "@/app/context/mainContext";
import Link from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const CardNota = ({ nota }) => {
  const { setNotaId, borrarEstaNota, moment } = useMain();
  var diferenciaHoraria = moment(nota.fecha, "YYYY-MM-DD HH:mm:ss").fromNow();
  diferenciaHoraria = diferenciaHoraria
    .replace("a few seconds ago", "Hace unos segundos")
    .replace("a minute ago", "Hace un minuto")
    .replace("minutes ago", "min")
    .replace("an hour ago", "h")
    .replace("hours ago", "hs")
    .replace("a month ago", "mes")
    .replace("months ago", "meses")
    .replace("a year ago", "año")
    .replace("years ago", "años");
  return (
    <div className="tarjeta" id={nota.id}>
      <Link
        onClick={() => setNotaId(nota.id)}
        href="/Nota"
        className="tarjeta__contenido"
      >
        <div
          className="tarjeta__contenido-cuerpo"
          dangerouslySetInnerHTML={{ __html: nota.nota.slice(0, 1000) }}
        ></div>
        <p className="tarjeta__contenido-pie ">{diferenciaHoraria}</p>
      </Link>
      <div className="tarjeta__acciones">
        <Link
          onClick={() => setNotaId(nota.id)}
          href="/Nota"
          className="tarjeta__acciones-editar"
        >
          <AiFillEdit />
          <p>Edit</p>
        </Link>
        <div
          className="tarjeta__acciones-eliminar"
          onClick={() => borrarEstaNota(nota.id)}
        >
          <AiFillDelete />
          <p>Delete</p>
        </div>
      </div>
    </div>
  );
};
export default CardNota;
