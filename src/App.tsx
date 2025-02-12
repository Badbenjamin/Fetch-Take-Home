import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import './App.css'
import Select from 'react-select'
// import { AdoptableDog } from './AdoptableDog'
import AdoptableDogList from './AdoptableDogList'

function App() {
  const [breedNames, setBreedNames] = useState([])
  const [breedMatchList, setMatchList] = useState([])
  const [adoptionArray, setAdoptionAray] = useState([])
  const [reactSelectOptions, setReactSelectOptions] = useState([])
  const [adoptableDogs, setAdoptableDogs] = useState([])
  const [total, setTotal] = useState(0)
  const [next, setNext] = useState("")
  const [prev, setPrev] = useState("")
  const navigate = useNavigate()
  console.log('tnp', total, next, prev)


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
            // "Accept": 'application/json',
        },
        credentials: 'include',
        method: "POST",
        body: "logout"
    })
    .then((response) => console.log(response))
    // .then((cookie) => console.log(cookie))
    navigate("/")

    
  }

  return (
    <>
      <div>
        <p>HOME PAGE</p><button onClick={logOut}>logout</button>
        <Select options={reactSelectOptions}
         onChange={opt=>handleBreedSelect(opt)}
         isMulti
         /><button onClick={onFindMatches}>FIND MATCHES</button>
         {adoptableDogs ? <AdoptableDogList adoptableDogs={adoptableDogs} /> : <>pick your breed</>}
         {/* <>{adoptionList}</> */}
        {!prev ? <>start</> : <button onClick={()=>navPage('prev')}>prev</button>}
        {!next ? <>end</> :<button onClick={()=>navPage('next')}>next</button>}
      </div>
    </>
  )
}

export default App
