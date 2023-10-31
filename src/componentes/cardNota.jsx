'use client'
import Link from "next/link";
const Nota = ({ nota, id, borrarEstaNota }) => {
    return (
        <div className="ContenedorNotaIndividual">
            <Link href={`/Nota/Editar/${id}`}  id={id} dangerouslySetInnerHTML={{ __html: nota }} style={{ flex: 1 }}></Link>
            <input type="button" value="X" className="borrarEstaNota" onClick={()=>borrarEstaNota(id)} />
        </div>
    );
}
export default Nota;
