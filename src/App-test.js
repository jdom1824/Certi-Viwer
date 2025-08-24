import { useState } from "react";
import Certificado from "./components/Certificado";

export default function App() {
  const [cedula, setCedula] = useState("12345678901"); // valor demo
  const [data, setData] = useState({
    name: "Juan David Peña Melo",
    description: "No evidence of deforestation was detected between 2020 and 2024...",
    fecha: "April 13, 2024",
    cedula: "12345678901",
  });
  const [error, setError] = useState("");

  return (
    <div>
      <Certificado
        cedula={cedula}
        setCedula={setCedula}
        data={data}
        setData={setData}
        error={error}
        setError={setError}
      />
    </div>
  );
}
