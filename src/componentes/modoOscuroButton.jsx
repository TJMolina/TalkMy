"use client";
import { useState } from "react";
import { AiOutlineBulb, AiTwotoneBulb } from "react-icons/ai";
export default function ApagarLuz() {
  const [prendido, setPrender] = useState(false);
  const prender = () => {
    document.querySelector("body").classList.toggle("oscuro");
    setPrender(!prendido);
  };
  return (
    <label className="label" onClick={prender}>
      {prendido ? <AiTwotoneBulb /> : <AiOutlineBulb />}
    </label>
  );
}
