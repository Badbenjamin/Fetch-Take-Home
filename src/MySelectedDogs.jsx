import { AdoptableDog } from "./AdoptableDog"

export default function MySelectedDogs({selectedDogs, handleDogRemove, getMatch, widthHeight}){

    function onRemove(e){
        handleDogRemove(e.target.value)
    }

    let selectedDogCards = selectedDogs.map((dog)=>{
        return(
            <div >
                <AdoptableDog key={dog.id} widthHeight={widthHeight} dog={dog}/>
                <button onClick={onRemove} value={dog.id}>REMOVE</button>
            </div>
        ) 
    })
    return(
        <div className="selected-dogs-container">
            <h2>MY FAVS</h2>
            <div className="my-selected-dogs">
                {selectedDogCards}
            </div>
            <button onClick={getMatch} >GET MATCH</button>
        </div>
        
    )
}