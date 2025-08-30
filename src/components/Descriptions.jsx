import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import "./Certificado.css";

export default function Certificado({ cedula, setCedula, data, setData, error, setError }) {
  const [loading, setLoading] = useState(false);

  const buscarCertificado = useCallback(async (cedulaParam) => {
    // Validación simple
    if (!cedulaParam || !cedulaParam.trim()) {
      setData(null);
      setError("Por favor ingrese una cédula.");
      return;
    }

    setLoading(true);
    setError("");         // limpia error previo
    setData(null);        // limpia datos previos mientras busca

    try {
      const res = await axios.get(`https://certic-44.duckdns.org/nft/${cedulaParam}`);
      setData({ ...res.data, cedula: cedulaParam });
    } catch (err) {
      // Mensaje más específico si es 404
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError("No se encontró un certificado para esa cédula.");
      } else {
        setError("Ocurrió un error al consultar el certificado. Intente nuevamente.");
      }
      setData(null);
    } finally {
      setLoading(false);
    }
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
    return data.cedula.length > 10 ? "/cert_ico2.jpg" : "/certificate.jpg";
  };

  return (
    <div className="cert-container">
      <h2>Buscar Certificado NFT</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="Ingrese la cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarCertificado(cedula)}
        />
        <button onClick={() => buscarCertificado(cedula)} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Mensaje de error visible cuando exista */}
      {!loading && error && (
        <p className="error" role="alert">{error}</p>
      )}

      {/* Resultado */}
      {!loading && data && (
        <div className="certificado">
          <img src={getCertImage()} alt="Certificado base" className="fondo" />

          <div className="datos">
            <p className="nombre">{data.name}</p>
            <p className="descripcion">{data.description}</p>
            <p className="fecha">{data.fecha}</p>
          </div>

          {/* QR dinámico (solo si la cédula tiene 11+ dígitos) */}
          {data?.cedula?.length > 10 && (
            <div className="qr-container">
              <QRCode
                value={`https://token-mamus.web.app/?cedula=${data.cedula}`}
                size={256}
                level="H"
                style={{ width: "100%", height: "100%" }}
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
