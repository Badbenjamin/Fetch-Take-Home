import { DogComponent } from "./DogComponent"
export function BreedList({breedNames}){

    let breedListArray = breedNames.map((breed) =>{
        console.log(breed)
        return <DogComponent key={breed} breed={breed} />
    })

    return(
        <>{breedListArray}</>
    )
}