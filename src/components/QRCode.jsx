import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCode = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef();
  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };
  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={350}
      bgColor={"#ffff66"}
      fgColor={"#000"}
      level={"L"}
      includeMargin={"true"}
    />
  );
  return (
    <div className="qrcode__container">
      <h1 className="qrcode__container-heading">Generate Free QR Code for Any Descripion or URL</h1>
      <div ref={qrRef}>{qrcode}</div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <label>Enter URL</label>
          <input
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="https://github.com/anurag-b72"
          />
          <button type="submit" disabled={!url}>
            Download QR code
          </button>
        </form>
      </div>
    </div>
  );
};

export default QrCode;