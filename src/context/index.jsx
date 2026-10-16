import { createContext, useContext, useState } from "react";

export const Context = createContext();

export const ContextApi = ({ children }) => {
  const [color, setColor] = useState("#000000");
  const [logo, setLogo] = useState(null);
  const [qrShape, setQrShape] = useState("square");

  return (
    <Context.Provider
      value={{
        color,
        setColor,
        logo,
        setLogo,
        qrShape,
        setQrShape,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useQr = () => useContext(Context);