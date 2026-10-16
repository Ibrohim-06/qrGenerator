import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { useQr } from "../context/";

const QrPreview = ({ url, qrColor, bgColor }) => {
  const qrRef = useRef(null);
  const containerRef = useRef(null);

  const { logo, color, qrShape } = useQr();

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !url) {
      if (container) container.innerHTML = "";
      qrRef.current = null;
      return;
    }

    const shapeMap = {
      square: "square",
      dots: "dots",
      rounded: "rounded",
      "extra-rounded": "extra-rounded",
      classy: "classy",
      "classy-rounded": "classy-rounded",
    };

    const qrCode = new QRCodeStyling({
      width: 400,
      height: 400,
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
        imageSize: 0.4,
        margin: 2,
        hideBackgroundDots: true,
      },
    });

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

  const downloadQR = () => {
    if (!url || !qrRef.current) return;

    qrRef.current.download({
      name: "qr-code",
      extension: "png",
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {url ? (
        <div
          ref={containerRef}
          className="aspect-square w-full max-w-100 overflow-hidden"
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