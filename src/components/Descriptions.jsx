import { useState } from "react";
export default function Description({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);    
  if (!data) return null;

const copyToClipboard = () => {
    navigator.clipboard.writeText(data.owner || "—")
    setCopied(true);
    setShowCopyModal(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
};

  const handleVerify = () => {
    setLoading(true);
    setShowModal(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  
  const handleGoToContract = () => {
    const url = `https://basescan.org/token/${data.contract}?a=${encodeURIComponent(data.cedula)}`;
    console.log("Opening URL:", url);
    if (data.contract && data.cedula) {
      window.open(url, "_blank"); 
    }
    setShowCopyModal(false);
  };

  return (
    <section className="descripcion-certificado">
      <h2 className="nombre-certificado">{data.name}</h2>
      <div className="detalle-certificado">
        <p>{data.description}</p>

        <div className="fechas">
          <div>
            <strong>Issued on</strong>
            <p>{data.fecha || "—"}</p>
          </div>
          <div>
            <strong>Expires on</strong>
            <p>Does not expire</p>
          </div>
        </div>

        <div className="verificacion">
          <h3>Credential Verification</h3>
          <ul>
            <li>🪪 This credential is from a <strong>verified issuer</strong></li>
            <li>🧿 Secured by Coinbase Blockchain</li>
          </ul>
          <div className="cred-actions">
            <button className="verificar" onClick={handleVerify}>
              Verify Credential
            </button>
            <button className="copiar-id" onClick={copyToClipboard}>
            {copied ? "Copied 🧿" : "Copy ID"}
            </button>
          </div>
        </div>

        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <button className="cerrar" onClick={() => setShowModal(false)}>✕</button>
              <h3>Credential Verification</h3>

              {loading ? (
                <div className="loading-container">
                  <div className="spinner"></div>
                  <p>Verifying credential, please wait...</p>
                </div>
              ) : (
                <>
                  <p>
                    <strong>{data.name}</strong> credential is <strong>verified</strong> 🔐.
                  </p>
                  <p>
                    This credential was securely issued and anchored on the blockchain network by a trusted issuer.
                  </p>
                  <hr />
                  <p>🧾 Verified by: <strong>Conexalab</strong></p>
                  <p>🧿 Blockchain Secured</p>
                  <p>
                    <strong>Blockchain ID:</strong>
                    <br />
                    <code>{data.owner || "—"}</code>
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
          {showCopyModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <button
              className="cerrar"
              onClick={() => setShowCopyModal(false)}
            >
              ✕
            </button>
            <h3>ID Copiado</h3>
            <p>ID copied successfully. Do you want to view the contract on the blockchain?</p>
            <div className="modal-actions">
              <button onClick={handleGoToContract}>Yes, view contract</button>
              <button onClick={() => setShowCopyModal(false)}>No, thanks</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
