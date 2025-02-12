import { AdoptableDog } from "./AdoptableDog"


export default function AdoptableDogList({adoptableDogs, handleDogSelection}){
    console.log('adl d', adoptableDogs)
    console.log(handleDogSelection)
    let adoptionList = adoptableDogs.map((dog)=>{
        return <AdoptableDog handleDogSelection={handleDogSelection} key={dog.name + dog.age} dog={dog}/>
      })
    return (
        <div className="adoption-list-cards">
            {adoptionList}
        </div>
    )
}