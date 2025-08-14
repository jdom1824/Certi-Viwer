import { useState } from "react";
import Certificado from "./components/Certificado";
import Description from "./components/Descriptions";
import "./App.css";

function App() {
  const [cedula, setCedula] = useState("");
  const [data, setData] = useState(null);
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