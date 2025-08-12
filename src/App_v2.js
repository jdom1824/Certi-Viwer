import { useState } from "react";
import Certificado from "./components/Certificado";
import Description from "./components/Descriptions";
import "./App.css";

function App() {
  const [cedula, setCedula] = useState("");
  const [data, setData] = useState({
    name: "Finca Villa Natalia",
    description: "No evidence of deforestation was detected between 2020 and 2024, according to the analysis of annual forest cover loss from “Global Forest Change” satellite imagery (30-meter resolution), processed through the i-CO2 platform.",
    fecha: new Date().toISOString().slice(0, 10)
  });
  const [error, setError] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.png" alt="Logo i-BC" />
        <h1>i-BC 5.0 – Blockchain Certification</h1>
      </header>

      <main>
        <Certificado
          cedula={cedula}
          setCedula={setCedula}
          data={data}
          setData={setData}
          error={error}
          setError={setError}
        />
        <Description data={data} />
      </main>

      <footer>
        © 2025 Conexalab · i-BC 5.0 · Blockchain Certification for Industry 5.0
      </footer>
    </div>
  );
}

export default App;