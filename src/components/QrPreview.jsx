import { useEffect, useRef } from "react";
import QRCode from "qrcode";

const QrPreview = ({ url, qrColor, bgColor }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!url || !canvasRef.current) return;

    QRCode.toCanvas(
      canvasRef.current,
      url,
      {
        width: 250,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: qrColor,
          light: bgColor,
        },
      },
      (error) => {
        if (error) {
          console.error("QR generation failed:", error);
        }
      }
    );
  }, [url, qrColor, bgColor]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} />

      <button
        type="button"
        onClick={() => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const link = document.createElement("a");
          link.download = "qr-code.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        }}
        disabled={!url}
      >
        Download QR
      </button>
    </div>
  );
};

export default QrPreview;