import { useContext, useState } from "react";
import ColorPeakerQr from "./ColorPeakerQr";
import ImageUpload from "./ImageUpload";
import { Context } from "../context";
import QrShape from "./QrShape";

const Costumize = ({ isOpen }) => {
    const { setColor, logo, setLogo } = useContext(Context)

    return (
        <div
            className={`${isOpen ? "h-75" : "h-0 overflow-hidden border-none"} mt-10  duration-500`}>
            <div>
                <ColorPeakerQr setColor={setColor} />
                <QrShape/>
            </div>

            <ImageUpload setLogo={setLogo} />

            {logo && (
                <div className="mt-4">
                    <img
                        src={logo}
                        alt="Logo preview"
                        className="h-20 w-20 object-contain" />
                    <button onClick={() => setLogo(null)}>
                        Remove logo
                    </button>
                </div>
            )}
        </div>
    );
};

export default Costumize;