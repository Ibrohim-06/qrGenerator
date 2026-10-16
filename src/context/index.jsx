import { createContext, useContext, useState } from "react";

export const Context = createContext();

export const ContextApi = ({ children }) => {
  const [color, setColor] = useState("#000000");
  const [logo, setLogo] = useState(null);

  return (
    <Context.Provider value={{ color, setColor, logo, setLogo }}>
      {children}
    </Context.Provider>
  );
};

export const useQr = () => {
  return useContext(Context);
};