import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import './App.css'

// import { AdoptableDog } from './AdoptableDog'
import AdoptableDogList from './AdoptableDogList'
import MySelectedDogs from './MySelectedDogs'
import Match from './Match'
import { SearchForDogs } from './SearchForDogs'

function App() {
  const [breedNames, setBreedNames] = useState([])
  const [breedMatchList, setMatchList] = useState([])
  const [adoptionArray, setAdoptionAray] = useState([])
  const [reactSelectOptions, setReactSelectOptions] = useState([])
  const [adoptableDogs, setAdoptableDogs] = useState([])
  const [selectedDogs, setSelectedDogs] = useState([])
  const [total, setTotal] = useState(0)
  const [next, setNext] = useState("")
  const [prev, setPrev] = useState("")
  const [sortDirection, setSortDirection]= useState("asc")
  const [match, setMatch] = useState('')
  const navigate = useNavigate()
  console.log('addd',adoptableDogs)
  // let sortDirection = document.getElementById('sort').value
  // console.log('sd', sortDirection)
  // console.log('tnp', total, next, prev)
  // console.log('bml', breedMatchList)

  // get breed names to build reactSelect options
  // COULD BE IN REACT SELECT SEARCH ELEMENT? 
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

  // build an array of selected breeds that can be passed to search fectch req
  function handleBreedSelect(breedNameArray){
    let breedsToMatch = breedNameArray.map((breedName)=>{
      return breedName.value
    })
    // console.log(breedsToMatch)
    setMatchList(breedsToMatch)
  }

  // accepts array of breed names from react-select search
  // returns ids of dogs, theses ids are sent to fetch.com/dogs to return dog objs
  // WORK ON THIS NEXT
  // BUILD SEPARATE SEARCH COMPONENT
  function onFindMatches(e){
    // console.log('breed match list find matches', breedMatchList)
    let breedQuery = ""
    if (breedMatchList.length == 1){
      breedQuery = breedMatchList
    } else if (breedMatchList.length > 1){
      for (const breed of breedMatchList){
        breedQuery += `&breeds=${breed}`
      }
    }
    
    // console.log('uribml',uriBreedMatchList)
    let sort = `&sort=breed:${sortDirection}`
    let url = `https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breedQuery}${sort}`
    console.log('url', url)
    fetch(url, {
       headers: {
        "Content-Type": "application/json",
        // "Accept": 'application/json',
      },
      credentials: 'include',
      method: "GET",
  })
    .then((response) => response.json())
    .then((responseData)=>{
      console.log('resp dat',responseData)
      setTotal(responseData.total)
      setNext(responseData.next)
      setPrev(responseData.prev)
      const newAdoptionArray = responseData.resultIds.map((id)=>{
        return id
      })
      
      setAdoptionAray(newAdoptionArray)
    })
  }

  function logOut(){
    const authUrl = "https://frontend-take-home-service.fetch.com/auth/logout"
    
    fetch(authUrl, {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        method: "POST",
        body: "logout"
    })
    navigate("/")
  }

  function getMatch(){
    console.log('sd',selectedDogs)
    
      fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
        headers: {
          "Content-Type": "application/json",
          // "Accept": 'application/json',
        },
        credentials: 'include',
        method: "POST",
        body : JSON.stringify(selectedDogs.map(dog => dog.id))
      })
      .then((response)=>response.json())
      .then((matchData)=>setMatch(matchData.match))
    
    
  }

  function clearMatches(){
    setReactSelectOptions([])
    setAdoptableDogs([])
    setNext("")
    setPrev("")
  }

  function selectChange(){
    setSortDirection(document.getElementById('sort').value)
  }

  function handleDogSelection(dog){
    let newSelectedDogs = [...selectedDogs, dog]
    setSelectedDogs(newSelectedDogs)
  }

  function handleDogRemove(dogId){
    console.log(dogId)
    console.log(selectedDogs)
    let newSelectedDogs = [...selectedDogs]
    let filteredSelectedDogs = newSelectedDogs.filter((dogObj)=>{
      return dogObj.id != dogId
    })
    setSelectedDogs(filteredSelectedDogs)
  }
  console.log(selectedDogs)
  return (
    <div>
        <button onClick={logOut}>log out</button>
        <SearchForDogs 
          reactSelectOptions={reactSelectOptions} 
          handleBreedSelect={handleBreedSelect} 
          selectChange={selectChange}
          onFindMatches={onFindMatches}
          clearMatches={clearMatches}
        />
        <MySelectedDogs handleDogRemove={handleDogRemove} selectedDogs={selectedDogs} getMatch={getMatch}/>
        
        <br></br>
        {match ? <Match match={match} /> : <></>}
        {adoptableDogs ? <AdoptableDogList 
                            selectedDogs={selectedDogs} 
                            handleDogSelection={handleDogSelection} 
                            adoptionArray={adoptionArray}
                            setAdoptionArray={setAdoptionAray}
                            total={total}
                            setTotal={setTotal}
                            next={next}
                            setNext={setNext}
                            prev={prev}
                            setPrev={setPrev}
                          /> 
                        : <>pick your breed</>
          }
    </div> 
  )
}

export default App
