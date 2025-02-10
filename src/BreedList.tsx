import { DogComponent } from "./DogComponent"
export function BreedList({breedNames, setMatchList, matchList}){

    let breedListArray = breedNames.map((breed) =>{
        // console.log(breed)
        return <DogComponent matchList={matchList} setMatchList={setMatchList} key={breed} breed={breed} />
    })

    return(
        <>{breedListArray}</>
    )
}