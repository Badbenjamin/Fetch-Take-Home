import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import './App.css'

// import { AdoptableDog } from './AdoptableDog'
import AdoptableDogList from './AdoptableDogList'
import MySelectedDogs from './MySelectedDogs'
import Match from './Match'
import { SearchForDogs } from './SearchForDogs'

function App() {
  // size of our screen for responsive design
  const [widthHeight, setWitdhHeight] = useState({'width': window.innerWidth, 'height': window.innerHeight})
  // page updated in dog list component (page navigae) or search component (new search results)
  const [currentPage, setCurrentPage] = useState(1)
  // adoptionArray contains ids for dog objects. returned from fetch in SearchForDogs, used to fetch 
  const [adoptionArray, setAdoptionArray] = useState([])
  // IDS OF OUR SELECTED DOGS?
  const [selectedDogs, setSelectedDogs] = useState([])
 
  // These states manage the adoptable dogs list returned from the search for dogs fetch request
  const [total, setTotal] = useState(0)
  const [next, setNext] = useState("")
  const [prev, setPrev] = useState("")
  
  // this is the id returned from the POST dogs/match endpoint
  const [match, setMatch] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    // setWitdhHeight({'width': window.innerWidth, 'height': window.innerHeight})
    function handleResize(){
      setWitdhHeight({'width': window.innerWidth, 'height': window.innerHeight})
    }
    window.addEventListener('resize', handleResize)
  },[])
  
  // log user out and clear cookies
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
    navigate("/Fetch-Take-Home/")
  }

  // getMatch takes the IDs of our selected dogs and posts them to POST dogs/match
  // this returns the ID of our match. 
  function getMatch(){
      fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        method: "POST",
        body : JSON.stringify(selectedDogs.map(dog => dog.id))
      })
      .then((response)=>{
        if (response.ok) {
          return response.json()
        } else {
          window.alert('please select dogs to get a match')
        }
      })
      .then((matchData)=>{
        if (matchData.match) {
          return setMatch(matchData.match)
        } else {
          window.alert('please select dogs to get a match')
        }
 
      })
  }

  // add a dog id to our selectedDogs array to display in MySelectedDogs component. 
  function handleDogSelection(dog){
    let newSelectedDogs = [...selectedDogs, dog]
    setSelectedDogs(newSelectedDogs)
  }

  // remove a dog id from selecteDogs array
  function handleDogRemove(dogId){
    let newSelectedDogs = [...selectedDogs]
    let filteredSelectedDogs = newSelectedDogs.filter((dogObj)=>{
      return dogObj.id != dogId
    })
    setSelectedDogs(filteredSelectedDogs)
  }
  
  return (
    <div className='main'>
        <h1>ADOPT A DOG!</h1>
        <button className='log-out' onClick={logOut}>LOG OUT</button>
        <br></br>
        <SearchForDogs 
          setAdoptionArray={setAdoptionArray}
          setTotal={setTotal}
          setNext={setNext}
          setPrev={setPrev}
          setCurrentPage={setCurrentPage}
        />
        <br></br>
        {selectedDogs.length > 0 ? <MySelectedDogs widthHeight={widthHeight} handleDogRemove={handleDogRemove} selectedDogs={selectedDogs} getMatch={getMatch}/> : <></>}
        <br></br>
        {match ? <Match widthHeight={widthHeight} match={match} /> : <></>}
        <br></br>
        {adoptionArray.length > 0 ? <AdoptableDogList 
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            selectedDogs={selectedDogs} 
                            handleDogSelection={handleDogSelection} 
                            adoptionArray={adoptionArray}
                            setAdoptionArray={setAdoptionArray}
                            total={total}
                            setTotal={setTotal}
                            next={next}
                            setNext={setNext}
                            prev={prev}
                            setPrev={setPrev}
                            widthHeight={widthHeight}
                          /> 
                        : <></>
          }
    </div> 
  )
}

export default App
