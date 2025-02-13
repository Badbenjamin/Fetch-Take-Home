import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import './App.css'
import Select from 'react-select'
// import { AdoptableDog } from './AdoptableDog'
import AdoptableDogList from './AdoptableDogList'
import MySelectedDogs from './MySelectedDogs'
import Match from './Match'

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

  // let sortDirection = document.getElementById('sort').value
  // console.log('sd', sortDirection)
  console.log('tnp', total, next, prev)
  console.log('bml', breedMatchList)

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
  

  function navPage(direction){
    console.log(direction)
    let pageDirection = null
    if (direction == "next" && next){
      pageDirection = next;
    } else if (direction == "prev" && prev){
      pageDirection = prev;
    } else {
      console.error("end");
    }

    // get next or prev from response to fetch next 25 results
    fetch(`https://frontend-take-home-service.fetch.com${pageDirection}`, {
      headers: {
        "Content-Type": "application/json",
        // "Accept": 'application/json',
      },
      credentials: 'include',
      method: "GET",
    })
    .then((response) => response.json())
    .then((responseData)=>{
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
    <>
      <div>
        <p>HOME PAGE</p><button onClick={logOut}>logout</button>
        <Select options={reactSelectOptions}
         onChange={opt=>handleBreedSelect(opt)}
         isMulti
         />
         <label for='sort'>Sort by</label>
            <select name="a-z" id='sort' onChange={selectChange}>
              <option value='asc'>A-Z</option>
              <option value='desc'>Z-A</option>
            </select>
         <button onClick={onFindMatches}>FIND MATCHES</button>
         <button onClick={clearMatches}>CLEAR MATCHES</button>
         <MySelectedDogs handleDogRemove={handleDogRemove} selectedDogs={selectedDogs}/>
         <button onClick={getMatch}>get match</button>
         <br></br>
         {match ? <Match match={match}/> : <></>}
         <p>RESULTS: {total}</p>
         {adoptableDogs ? <AdoptableDogList selectedDogs={selectedDogs} handleDogSelection={handleDogSelection} adoptableDogs={adoptableDogs} /> : <>pick your breed</>}
         {/* <>{adoptionList}</> */}
        {!prev ? <></> : <button onClick={()=>navPage('prev')}>prev</button>}
        {!next ? <></> :<button onClick={()=>navPage('next')}>next</button>}
      </div>
    </>
  )
}

export default App
