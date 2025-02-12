import { AdoptableDog } from "./AdoptableDog"


export default function AdoptableDogList({adoptableDogs}){
    console.log('adl d', adoptableDogs)
    
    let adoptionList = adoptableDogs.map((dog)=>{
        return <AdoptableDog key={dog.name + dog.age} dog={dog}/>
      })
    return (
        <div className="adoption-list-cards">
            {adoptionList}
        </div>
    )
}