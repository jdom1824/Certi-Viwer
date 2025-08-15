import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Certificado.css";

export default function Certificado({ cedula, setCedula, data, setData, error, setError }) {
  const [loading, setLoading] = useState(false);

  const buscarCertificado = async (cedulaParam) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://certic-44.duckdns.org/nft/${cedulaParam}`);
      // ⬇️ Guardamos el snapshot de la cédula usada en la búsqueda
      setData({ ...res.data, cedula: cedulaParam });
      setError("");
    } catch (err) {
      setData(null);
      setError("No se encontró un certificado para esa cédula.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cedulaURL = params.get("cedula");
    if (cedulaURL) {
      setCedula(cedulaURL);
      buscarCertificado(cedulaURL);
    }
  }, [setCedula]);

  const getCertImage = () => {
    if (!data?.cedula) return "/certificate.jpg";            
    return data.cedula.length > 10 ? "/cert_ico2.jpg"   // 11+ dígitos
                                   : "/certificate.jpg";  // 6–10 dígitos (ajustá a tu regla)
  };

  return (
    <div className="cert-container">
      <h2>Buscar Certificado NFT</h2>

      <input
        type="text"
        placeholder="Ingrese la cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
      <button onClick={() => buscarCertificado(cedula)}>Buscar</button>

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Generando certificado...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {!loading && data && (
        <div className="certificado">
          <img src={getCertImage()} alt="Certificado base" className="fondo" />
          <div className="datos">
            <p className="nombre">{data.name}</p>
            <p className="descripcion">{data.description}</p>
            <p className="fecha">{data.fecha}</p>
          </div>
        </div>
      )}
    </div>
  );
}
