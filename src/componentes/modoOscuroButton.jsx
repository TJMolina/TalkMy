import { AiTwotoneBulb } from "react-icons/ai";
export default function ApagarLuz(){
return (
    <label className="label" onClick={()=>document.querySelector('body').classList.toggle('oscuro')}>
        <AiTwotoneBulb />
    </label>)
}