import { DogComponent } from "./DogComponent"
export function BreedList({breedNames, setMatchList, breedMatchList}){

    let breedListArray = breedNames.map((breed) =>{
        // console.log(breed)
        return <DogComponent breedMatchList={breedMatchList} setMatchList={setMatchList} key={breed} breed={breed} />
    })

    return(
        <>{breedListArray}</>
    )
}