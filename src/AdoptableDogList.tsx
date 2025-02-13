import { useState, useEffect } from "react"

import { AdoptableDog } from "./AdoptableDog"
import './App.css'

export default function AdoptableDogList({ handleDogSelection, selectedDogs, adoptionArray, setAdoptionArray, prev, setPrev, next, setNext, total, setTotal}){
    const [adoptableDogs, setAdoptableDogs] = useState([])
    // const [total, setTotal] = useState(0)
    // const [next, setNext] = useState("")
    // const [prev, setPrev] = useState("")
    // console.log('adadl', ad)
    console.log('adoptarray',adoptionArray)
    console.log('adoptable dogs', adoptableDogs)

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
          setAdoptionArray(newAdoptionArray)
        })
       
      }

    let adoptionList = adoptableDogs.map((dog)=>{
        return <AdoptableDog
            selectedDogs={selectedDogs} 
            handleDogSelection={handleDogSelection} 
            key={dog.name + dog.age} 
            dog={dog}
            />
      })
    return (
        <div className="dog-match-container">
            {/* <p>RESULTS: {total}</p> */}
            <div className="adoptable-dog-list">
                {adoptionList}
            </div>
            {!prev ? <></> : <button onClick={()=>navPage('prev')}>prev</button>}
            {!next ? <></> :<button onClick={()=>navPage('next')}>next</button>}
        </div>
        
    )
}