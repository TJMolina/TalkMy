import { useMain } from "@/app/context/mainContext";
import { completarNota } from "@/services/manejarNotas";
import Link from "next/link";
import { useState } from "react";
import { AiFillDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const CardNota = ({ nota }) => {
  const { setNotaId, borrarEstaNota, moment } = useMain();
  const [completada, setCompletada] = useState(nota.completada === '1'? true : false);
  var diferenciaHoraria = moment(nota.fecha, "YYYY-MM-DD HH:mm:ss").fromNow();
  diferenciaHoraria = diferenciaHoraria
    .replace("a few seconds ago", "Hace unos segundos")
    .replace("seconds ago", "Hace unos segundos")
    .replace("a minute ago", "Hace un minuto")
    .replace("minutes ago", "min")
    .replace("an hour ago", "1h")
    .replace("hours ago", "hs")
    .replace("a month ago", "1 mes")
    .replace("months ago", "meses")
    .replace("a year ago", "1 año")
    .replace("years ago", "años");

  const completar = () => {
    nota.completada = nota.completada == "1"? "0":"1";
    setCompletada(!completada);
    document.getElementById(nota.id).classList.toggle("NotaCompletada");
    completarNota(nota, moment().format("YYYY-MM-DD HH:mm:ss"));
  };

  return (
    <div
      className={`tarjeta ${completada && "NotaCompletada"}`}
      id={nota.id}
    >
      <Link
        onClick={() => setNotaId(nota.id)}
        href="/TaskForm"
        className="tarjeta__contenido"
      >
        <div
          className="tarjeta__contenido-cuerpo"
          dangerouslySetInnerHTML={{ __html: nota.nota.slice(0, 1000) }}
        ></div>
        <p className="tarjeta__contenido-pie ">{diferenciaHoraria}</p>
      </Link>
      <div className="tarjeta__acciones">
        <Link onClick={completar} href="#" className="tarjeta__acciones-editar">
        {completada?<AiOutlineClose />:<AiOutlineCheck />}
        </Link>
        <div
          className="tarjeta__acciones-eliminar"
          onClick={() => borrarEstaNota(nota.id)}
        >
          <AiFillDelete />
          <p>Del</p>
        </div>
      </div>
    </div>
  );
};
export default CardNota;
