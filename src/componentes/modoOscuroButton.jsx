import { useContext } from "react";
import { AiOutlineBulb, AiTwotoneBulb } from "react-icons/ai";
export default function ApagarLuz() {
  const { luzOnOff } = useContext();
  return (
    <label className="label" onClick={luzOnOff}>
      {prendido ? <AiTwotoneBulb /> : <AiOutlineBulb />}
    </label>
  );
}
