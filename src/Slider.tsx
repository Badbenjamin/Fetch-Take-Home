import Slider from 'rc-slider'
import './App.css'

import 'rc-slider/assets/index.css'
import { useState } from 'react'

export default function AgeSlider({setAgeParams, ageParams}){
    
    

    function handleChange(values){
        setAgeParams([values[0],values[1]])
    }

    return(
        <span className='slider-component'>
            <span>MIN AGE: {ageParams[0]}</span>
            <Slider
            range
            className='age-slider'
            min={0}
            max={20}
            tabIndex={[ageParams[0], ageParams[1]]}
            defaultValue={[0,20]}
            value={[ageParams[0], ageParams[1]]}
            onChange={handleChange}
            />
            <span>MAX AGE: {ageParams[1]}</span>
        </span>
        
    )
}