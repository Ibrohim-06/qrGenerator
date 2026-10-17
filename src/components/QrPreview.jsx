import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { useQr } from "../context/";

const QrPreview = ({ url, qrColor, bgColor }) => {
  const qrRef = useRef(null);
  const containerRef = useRef(null);

  const { logo, color, qrShape } = useQr();

  const shapeMap = {
    square: "square",
    dots: "dots",
    rounded: "rounded",
    "extra-rounded": "extra-rounded",
    classy: "classy",
    "classy-rounded": "classy-rounded",
  };

  const createQR = (size) => {
    return new QRCodeStyling({
      width: size,
      height: size,
      type: "canvas",
      data: url,

      margin: 30,

      qrOptions: {
        errorCorrectionLevel: "H",
      },

      dotsOptions: {
        color: color || qrColor || "#000000",
        type: shapeMap[qrShape] || "square",
      },

      backgroundOptions: {
        color: bgColor || "#ffffff",
      },

      image: logo || undefined,

      imageOptions: {
        crossOrigin: "anonymous",
        imageSize: 0.3,
        margin: 1,
        hideBackgroundDots: false,
      },
    });
  };

  // Generate preview QR
  useEffect(() => {
    const container = containerRef.current;

    if (!container || !url) {
      if (container) {
        container.innerHTML = "";
      }

      qrRef.current = null;
      return;
    }

    const qrCode = createQR(400);

    container.innerHTML = "";

    qrCode.append(container);

    qrRef.current = qrCode;

    return () => {
      container.innerHTML = "";

      if (qrRef.current === qrCode) {
        qrRef.current = null;
      }
    };
  }, [url, color, qrColor, bgColor, logo, qrShape]);

  // Generate a NEW high-resolution QR for download
  const downloadQR = () => {
    if (!url) return;

    const downloadQr = createQR(1098);

    downloadQr.download({
      name: "qr-code",
      extension: "png",
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {url ? (
        <div
          ref={containerRef}
          className="h-100 w-100 overflow-hidden"
        />
      ) : (
        <p className="text-gray-500">
          Enter a URL to generate your QR code.
        </p>
      )}

      <button
        type="button"
        onClick={downloadQR}
        disabled={!url}
        className="rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Download QR
      </button>
    </div>
  );
};

export default QrPreview;