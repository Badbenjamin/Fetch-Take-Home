import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [breedNames, setBreedNames] = useState([])

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



  return (
    <>
      <div>
        <p>HOME PAGE</p>
      </div>
    </>
  )
}

export default App
