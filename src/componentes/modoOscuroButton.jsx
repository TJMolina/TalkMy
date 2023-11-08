import { useMain } from "@/app/context/mainContext";
import { AiOutlineBulb, AiTwotoneBulb } from "react-icons/ai";
export default function ApagarLuz() {
  const { luzOnOff, modoOscuro } = useMain();
  return (
    <label className="label" onClick={luzOnOff}>
      {modoOscuro ? <AiTwotoneBulb /> : <AiOutlineBulb />}
    </label>
  );
}
