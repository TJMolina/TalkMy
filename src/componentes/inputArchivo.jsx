import {AiOutlineFolderOpen} from 'react-icons/ai'
const InputArchivo = ({leerArchivoDelInput}) => {
  return (
      <label htmlFor="file-input" className='label'><AiOutlineFolderOpen className="svg" />
        <input type="file" id="file-input" onChange={leerArchivoDelInput} style={{display: 'none'}}  accept=".txt, .pdf, .doc, .docx, .rtf, .csv, .xml, .html, .md" />
      </label>
  );
};
export default InputArchivo;