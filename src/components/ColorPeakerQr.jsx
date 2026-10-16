import React, { useContext, useState } from 'react'
import { CirclePicker } from 'react-color'
import { Context } from '../context'

const ColorPeakerQr = () => {
    const {setColor} = useContext(Context)
    function handleColorChange(e){
        setColor(e.hex)        
    }
    return (
        <div className='flex justify-center mb-4'>
            <CirclePicker circleSize={30} className='w-160!' circleSpacing={5} onChange={handleColorChange} />
        </div>
    )
}

export default ColorPeakerQr