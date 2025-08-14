import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./Certificado.css";

// Datos de prueba
const TEST_DATA = {
  "1203989": {
    name: "Sebastián Cárcamo Arreola",
    description:
      "This certificate recognizes your participation in the 2024 Aerospace Engineering Bootcamp, held at Colegio Interamericano from April 8 to 13, 2024. We proudly acknowledge your dedication to learning and applying rocket engineering for a total of 25 hours.",
    fecha: new Date().toISOString().slice(0, 10),
    tipo: "cedula",
  },
  "110011001100110": {
    name: "Finca Villa Natalia",
    description:
      "No evidence of deforestation was detected between 2020 and 2024, according to the analysis of annual forest cover loss from “Global Forest Change” satellite imagery (30-meter resolution), processed through the i-CO2 platform.",
    fecha: new Date().toISOString().slice(0, 10),
    tipo: "catastral",
  },
};

export default function Certificado({ cedula, setCedula, data, setData, error, setError }) {
  const [loading, setLoading] = useState(false);

  // Detecta si es cédula o catastral
  const esCedula = (valor) => /^\d{6,10}$/.test(valor);
  const esCatastral = (valor) => /^\d{11,}$/.test(valor);

  // Imagen según tipo
  const getCertImage = () => {
    if (esCedula(cedula)) return "/certificate.jpg";
    if (esCatastral(cedula)) return "/cert_ico2.jpg";
    return "/cert_ico2.jpg";
  };

  // QR según tipo
  const getQRValue = () => {
    if (esCedula(cedula)) return `https://token-mamus.web.app/?cedula=${cedula}`;
    if (esCatastral(cedula)) return `https://token-mamus.web.app/?catastral=${cedula}`;
    return "https://token-mamus.web.app/";
  };

  // Cuando el usuario hace click en buscar
  const buscarCertificado = () => {
    setLoading(true);
    setTimeout(() => {
      if (TEST_DATA[cedula]) {
        setData(TEST_DATA[cedula]);
        setError("");
      } else {
        setData(null);
        setError("No se encontró un certificado para esa cédula o número catastral.");
      }
      setLoading(false);
    }, 500); // Simula retardo
  };

  // Permite buscar con Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") buscarCertificado();
  };

  return (
    <div className="cert-container">
      <h2>Buscar Certificado NFT</h2>
      <input
        type="text"
        placeholder="Ingrese la cédula o número catastral."
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={buscarCertificado}>Buscar</button>

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
          {esCatastral(cedula) && (
          <div className="qr-container">
            <QRCodeSVG value={getQRValue()} size={45} />
          </div>
          )}
        </div>
      )}
    </div>
  );
}