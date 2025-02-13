import { useState, useEffect } from "react"

export function AdoptableDog({dog, handleDogSelection, selectedDogs}){
    const [color, setColor] = useState('rgb(149, 179, 236)')
    let selectedDogIds = []
    if (selectedDogs){
        selectedDogIds = selectedDogs.map(dog => dog.id)
    }

    useEffect(()=>{
        if (selectedDogIds.includes(dog.id)){
            setColor('rgb(149, 79, 236)')
        } else {
            setColor('rgb(149, 179, 236)')
        }
    },[selectedDogs])
    
    

    function handleClick(){
        handleDogSelection(dog)
    }

    return(
        <div style={{backgroundColor : color}}  onClick={handleClick} className="adoptable-dog">
            <img width={100} height={100} src={dog.img} alt={dog.breed} />
            <br></br>
            <>NAME: {dog.name}</>
            <br></br>
            <>BREED: {dog.breed}</>
            <br></br>
            <>AGE: {dog.age}</>
            <br></br>
            <>ZIP: {dog.zip_code}</>
        </div>
    )
}