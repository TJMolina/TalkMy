'use client'
import Link from "next/link";
const Nota = ({ nota, id, borrarEstaNota }) => {
    return (
        <div className="ContenedorNotaIndividual">
            <input type="button" value="X" className="borrarEstaNota" onClick={()=>borrarEstaNota(id)} />
            <Link href={`/Nota/Editar/${id}`}  id={id} dangerouslySetInnerHTML={{ __html: nota }} style={{ height: '100%' }}></Link>
        </div>
    );
}
export default Nota;
