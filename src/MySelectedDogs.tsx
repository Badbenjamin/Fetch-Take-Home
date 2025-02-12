import { AdoptableDog } from "./AdoptableDog"

export default function MySelectedDogs({selectedDogs, handleDogRemove}){

    function onRemove(e){
        handleDogRemove(e.target.value)
    }

    let selectedDogCards = selectedDogs.map((dog)=>{
        return(
            <div>
                <AdoptableDog dog={dog}/>
                <button onClick={onRemove} value={dog.id}>remove</button>
            </div>
        ) 
    })
    return(
        <div className="my-selected-dogs">
            {selectedDogCards}
        </div>
    )
}