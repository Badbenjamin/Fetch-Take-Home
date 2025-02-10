import { useState, useEffect } from 'react'

import './App.css'
import { DogComponent } from './DogComponent'
import { BreedList } from './BreedList'
import SearchBar from './SearchBar'

function App() {
  const [breedNames, setBreedNames] = useState([])
  const [searchText, setSearchText] = useState("")

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


  return (
    <>
      <div>
        <p>HOME PAGE</p>
        <SearchBar setSearchText={setSearchText}/>
        <BreedList breedNames={filteredBreedNames} />
      </div>
    </>
  )
}

export default App
