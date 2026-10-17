import React, { useContext } from 'react'
import { CirclePicker } from 'react-color'
import { Context } from '../context'

const ColorPeakerQr = () => {
    const { setColor } = useContext(Context)

    function handleColorChange(e) {
        setColor(e.hex)
    }

    function handleCustomColor(e) {
        setColor(e.target.value)
    }

    return (
        <div className="flex flex-col items-center gap-4 mb-4">
            <CirclePicker
                circleSize={30}
                className="w-160!"
                circleSpacing={5}
                onChange={handleColorChange}
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
                    className="w-8 h-8 cursor-pointer rounded"
                />
            </div>
        </div>
    )
}

export default ColorPeakerQr