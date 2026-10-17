import React, { useContext } from "react";
import { CirclePicker } from "react-color";
import { Context } from "../context";

const ColorPeakerQr = () => {
  const { setColor } = useContext(Context);

  function handleColorChange(e) {
    setColor(e.hex);
  }

  function handleCustomColor(e) {
    setColor(e.target.value);
  }

  return (
    <div className="flex justify-center items-center gap-4 mb-4">
      <CirclePicker
        colors={["#0400FF", "green", "red", "yellow", "darkblue", "purple"]}
        circleSize={30}
        circleSpacing={5}
        onChange={handleColorChange}
        width="full"
      />

      <div className="flex items-center gap-2">
        <label
          htmlFor="custom-color"
          className="text-sm font-medium"
        >
          Custom color
        </label>

        <input
          id="custom-color"
          type="color"
          onChange={handleCustomColor}
          className="h-8 w-8 cursor-pointer rounded"
        />
      </div>
    </div>
  );
};

export default ColorPeakerQr;