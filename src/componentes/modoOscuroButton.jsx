import { AiTwotoneBulb } from "react-icons/ai";
export default function ApagarLuz(){
const apagar = ()=> document.querySelector('body').classList.toggle('oscuro')
return (
    <label className="label" onClick={apagar}>
        <AiTwotoneBulb />
    </label>)
}