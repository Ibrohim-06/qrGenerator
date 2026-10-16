import { useQr } from "../context/";

const shapes = [
    { label: "Square", value: "square" },
    { label: "Dots", value: "dots" },
    { label: "Rounded", value: "rounded" },
    { label: "Extra Rounded", value: "extra-rounded" },
    { label: "Classy", value: "classy" },
    { label: "Classy Rounded", value: "classy-rounded" },
];

const QrShape = () => {
    const { qrShape, setQrShape } = useQr();

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold">QR Pattern</h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {shapes.map((shape) => (
                    <button
                        key={shape.value}
                        type="button"
                        onClick={() => setQrShape(shape.value)}
                        className={`rounded-lg border px-3 py-3 text-sm transition ${qrShape === shape.value
                                ? "border-black bg-black text-white"
                                : "border-gray-300 hover:border-black"
                            }`}
                    >
                        {shape.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QrShape;