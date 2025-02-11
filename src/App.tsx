import { useState, useEffect } from 'react'

import './App.css'
import { DogComponent } from './DogComponent'
import { BreedList } from './BreedList'
import SearchBar from './SearchBar'
import ReactSelectSearch from './ReactSelectSearch'
import Select from 'react-select'
import { AdoptableDog } from './AdoptableDog'

function App() {
  const [breedNames, setBreedNames] = useState([])
  const [searchText, setSearchText] = useState("")
  const [breedMatchList, setMatchList] = useState([])
  const [adoptionArray, setAdoptionAray] = useState([])
  const [reactSelectOptions, setReactSelectOptions] = useState([])
  const [adoptableDogs, setAdoptableDogs] = useState([])
  // console.log('o', reactSelectOptions)
  console.log('adar',adoptionArray)
  console.log('btm', breedMatchList)

  // get breed names to build reactSelect options
  useEffect(() => {
    fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
      headers: {
        "Content-Type": "application/json",
        // "Accept": 'application/json',
      },
      credentials: 'include',
      method: "GET",
    })
      .then((response) => response.json())
      .then((dogBreedResponse) => setBreedNames(dogBreedResponse))
  }, [])

  
  // build react select options
  useEffect(()=>{
    let breedsForSelect = breedNames.map((breed)=>{
      return {value: breed, label: breed}
    })
    setReactSelectOptions(breedsForSelect)

  },[breedNames])

  // build an array of selected breeds that can be passed to fectch req
  function handleBreedSelect(breedNameArray){
    let breedsToMatch = breedNameArray.map((breedName)=>{
      return breedName.value
    })
    // console.log(breedsToMatch)
    setMatchList(breedsToMatch)
  }

  // accepts array of matching breeds
  // returns ids of dogs, theses ids are sent to fetch.com/dogs to return dog objs
  function onFindMatches(e){
    console.log('breed match list find matches', breedMatchList)
    fetch(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breedMatchList}`, {
       headers: {
        "Content-Type": "application/json",
        // "Accept": 'application/json',
      },
      credentials: 'include',
      method: "GET",
  })
    .then((response) => response.json())
    .then((responseData)=>{
      const newAdoptionArray = responseData.resultIds.map((id)=>{
        return id
      })
      
      setAdoptionAray(newAdoptionArray)
    })
  }

  // takes ids and returns dog objects
  useEffect(()=>{
    fetch('https://frontend-take-home-service.fetch.com/dogs', {
      headers: {
        "Content-Type": "application/json",
        // "Accept": 'application/json',
      },
      credentials: 'include',
      method: "POST",
      body : JSON.stringify(adoptionArray)
    })
    .then((response)=>response.json())
    .then((dogData)=>setAdoptableDogs(dogData))
  }, [adoptionArray])

  // let adoptionList = []
  let adoptionList = adoptableDogs.map((dog)=>{
    return <AdoptableDog key={dog.name, dog.age} dog={dog}/>
  })

  return (
    <>
      <div>
        <p>HOME PAGE</p>
        <Select options={reactSelectOptions}
         onChange={opt=>handleBreedSelect(opt)}
         isMulti
         /><button onClick={onFindMatches}>FIND MATCHES</button>
         <>{adoptionList}</>
        {/* <BreedList breedNames={filteredBreedNames} breedMatchList={breedMatchList} setMatchList={setMatchList}/> */}
      </div>
    </>
  )
}

export default App
