import { useState, useEffect } from 'react'

import './App.css'
import { DogComponent } from './DogComponent'
import { BreedList } from './BreedList'
import SearchBar from './SearchBar'

function App() {
  const [breedNames, setBreedNames] = useState([])
  const [searchText, setSearchText] = useState("")
  const [breedMatchList, setMatchList] = useState([])
  const [adoptionArray, setAdoptionAray] = useState([])

  console.log('adar',adoptionArray)
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

  const filteredBreedNames = breedNames.filter(breedName=>{
      return breedName.toUpperCase().includes(searchText.toUpperCase())
  })

  // let breedList = breedNames.map((breed)=>{
  //   return <DogComponent key={breed} breed={breed} />
  // })
  function onFindMatches(e){
  

    fetch(`https://frontend-take-home-service.fetch.com/dogs/search`, {
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
    .then((dogData)=>{console.log("dd",dogData)})
  }, [adoptionArray])


  return (
    <>
      <div>
        <p>HOME PAGE</p>
        <>selected breeds {breedMatchList}</>
        <button onClick={onFindMatches}>FIND MATCHES</button>
        <SearchBar setSearchText={setSearchText}/>
        <BreedList breedNames={filteredBreedNames} breedMatchList={breedMatchList} setMatchList={setMatchList}/>
      </div>
    </>
  )
}

export default App
