import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import "./Certificado.css";

export default function Certificado({ cedula, setCedula, data, setData, error, setError }) {
  const [loading, setLoading] = useState(false);

  const buscarCertificado = useCallback(async (cedulaParam) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://certic-44.duckdns.org/nft/${cedulaParam}`);
      setData({ ...res.data, cedula: cedulaParam });
      setError("");
    } catch (err) {
      setData(null);
      setError("No se encontró un certificado para esa cédula.");
    }
    setLoading(false);
  }, [setData, setError]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cedulaURL = params.get("cedula");
    if (cedulaURL) {
      setCedula(cedulaURL);
      buscarCertificado(cedulaURL);
    }
  }, [setCedula, buscarCertificado]);

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
      <button onClick={() => buscarCertificado(cedula)} disabled={loading}>
      {loading ? "Buscando..." : "Buscar"}
      </button>
      {!loading && error && (
      <p className="error" role="alert">{error}</p>
      )}
      {!loading && data && (
        <div className="certificado">
          <img src={getCertImage()} alt="Certificado base" className="fondo" />

          <div className="datos">
            <p className="nombre">{data.name}</p>
            <p className="descripcion">{data.description}</p>
            <p className="fecha">{data.fecha}</p>
          </div>

          {/* QR dinámico */}
          {data?.cedula.length > 10 && (
          <div className="qr-container">
          <QRCode
            value={`https://token-mamus.web.app/?cedula=${data.cedula}`}
            size={256}                 // tamaño base grande (SVG)
            level="H"
            style={{ width: "100%", height: "100%" }}  // ⬅️ que lo escale el CSS
            bgColor="#ffffff"
            fgColor="#000000"
            />
          </div>
          )}
        </div>
      )}
    </div>
  );
}
