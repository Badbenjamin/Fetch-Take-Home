import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import './App.css'

// import { AdoptableDog } from './AdoptableDog'
import AdoptableDogList from './AdoptableDogList'
import MySelectedDogs from './MySelectedDogs'
import Match from './Match'
import { SearchForDogs } from './SearchForDogs'

function App() {
  // 
  // const [breedNames, setBreedNames] = useState([])
  // const [breedMatchList, setMatchList] = useState([])

  // adoption array is used to build match list?
  // SHARED BETWEEN SEARCH AND ADOPTABLE DOG LIST
  const [adoptionArray, setAdoptionAray] = useState([])
  // const [reactSelectOptions, setReactSelectOptions] = useState([])
  const [adoptableDogs, setAdoptableDogs] = useState([])
  const [selectedDogs, setSelectedDogs] = useState([])

  // THESE STATES ARE SHARED BETWEEN SEARCH AND ADOPTABLE DOG LIST
  const [total, setTotal] = useState(0)
  const [next, setNext] = useState("")
  const [prev, setPrev] = useState("")
  // const [sortDirection, setSortDirection]= useState("asc")
  // const [ageParams, setAgeParams] = useState([0,20])
  const [match, setMatch] = useState('')
  const navigate = useNavigate()
  

  // // get breed names to build reactSelect options
  // // COULD BE IN REACT SELECT SEARCH ELEMENT? 
  // useEffect(() => {
  //   fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       // "Accept": 'application/json',
  //     },
  //     credentials: 'include',
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((dogBreedResponse) => setBreedNames(dogBreedResponse))
  // }, [])

  
  // // build react select options
  // useEffect(()=>{
  //   let breedsForSelect = breedNames.map((breed)=>{
  //     return {value: breed, label: breed}
  //   })
  //   setReactSelectOptions(breedsForSelect)

  // },[breedNames])

  // build an array of selected breeds that can be passed to search fectch req
  // function handleBreedSelect(breedNameArray){
  //   let breedsToMatch = breedNameArray.map((breedName)=>{
  //     return breedName.value
  //   })
  //   // console.log(breedsToMatch)
  //   setMatchList(breedsToMatch)
  // }

  // accepts array of breed names from react-select search
  // returns ids of dogs, theses ids are sent to fetch.com/dogs to return dog objs
  // function onFindMatches(e){
  //   // console.log('breed match list find matches', breedMatchList)
  //   let breedQuery = ""
  //   if (breedMatchList.length == 1){
  //     breedQuery = breedMatchList
  //   } else if (breedMatchList.length > 1){
  //     for (const breed of breedMatchList){
  //       breedQuery += `&breeds=${breed}`
  //     }
  //   }
    
  //   // console.log('uribml',uriBreedMatchList)
  //   let breeds = `breeds=${breedQuery}`
  //   let age= `&ageMin=${ageParams[0]}&ageMax=${ageParams[1]}`
  //   let sort = `&sort=breed:${sortDirection}`
  //   let url = 'https://frontend-take-home-service.fetch.com/dogs/search'
  //   if (breedQuery){
  //     url = `https://frontend-take-home-service.fetch.com/dogs/search?${breeds}${age}${sort}`
  //   } else {
  //     url = `https://frontend-take-home-service.fetch.com/dogs/search?${age}${sort}`
  //   }
    
  //   console.log('url', url)
  //   console.log('url', url)
  //   fetch(url, {
  //      headers: {
  //       "Content-Type": "application/json",
  //       // "Accept": 'application/json',
  //     },
  //     credentials: 'include',
  //     method: "GET",
  // })
  //   .then((response) => response.json())
  //   .then((responseData)=>{
  //     console.log('resp dat',responseData)
  //     setTotal(responseData.total)
  //     setNext(responseData.next)
  //     setPrev(responseData.prev)
  //     const newAdoptionArray = responseData.resultIds.map((id)=>{
  //       return id
  //     })
      
  //     setAdoptionAray(newAdoptionArray)
  //   })
  // }

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

  // function selectChange(){
  //   setSortDirection(document.getElementById('sort').value)
  // }

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
          // rso can be moved into component
          // reactSelectOptions={reactSelectOptions} 
          // move into component
          // handleBreedSelect={handleBreedSelect} 
          // move into component
          setAdoptionArray={setAdoptionAray}
          setTotal={setTotal}
          setNext={setNext}
          setPrev={setPrev}

          // selectChange={selectChange}
          // onFindMatches={onFindMatches}
          // clearMatches={clearMatches}
          // setAgeParams={setAgeParams}
          // ageParams={ageParams}
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
