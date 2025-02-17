import { useState, useEffect } from "react"

import { AdoptableDog } from "./AdoptableDog"
import PageNumberElement from "./PageNumberElement"
import './App.css'

export default function AdoptableDogList({currentPage, setCurrentPage, handleDogSelection, selectedDogs, adoptionArray, setAdoptionArray, prev, setPrev, next, setNext, total, setTotal, widthHeight}){
    // array of dog objects returned from POST /dogs 
    // used to create adoptionList, which is made of AdoptableDogs components
    const [adoptableDogs, setAdoptableDogs] = useState([])
    
    
    const numberOfPagesArray = [...Array(Math.ceil(total/25)).keys()];
   
    
    // useEffect takes adoptionArray, which is arrray of adoptable dog ids returned from GET dogs/search
    useEffect(()=>{
        fetch('https://frontend-take-home-service.fetch.com/dogs', {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                method: "POST",
                body : JSON.stringify(adoptionArray)
            })
            .then((response)=>{
              if (response.ok){
               return response.json()
              } else {
               window.alert('request failed')
              }
            })
            .then((dogData)=>setAdoptableDogs(dogData))
    }, [adoptionArray])

    
    const pageNumberElements = numberOfPagesArray.map((pageNum)=>{
        return <PageNumberElement key={pageNum} pageNum={pageNum + 1} currentPage={currentPage} />
    })

    // navDirection uses the prev or next url param to load the next page of dogs
    function navDirection(direction){
        console.log(direction)
        let pageDirection = null
        let newPage = currentPage
        if (direction == "next" && next){
          pageDirection = next;
          newPage += 1
        } else if (direction == "prev" && prev){
          pageDirection = prev;
          newPage -= 1
        } else {
          console.error("end");
        }
    
        // get next or prev from search response to fetch next 25 results
        fetch(`https://frontend-take-home-service.fetch.com${pageDirection}`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          method: "GET",
        })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            window.alert('request failed')
          }
        })
        .then((responseData)=>{
          setTotal(responseData.total)
          setNext(responseData.next)
          setPrev(responseData.prev)
          setCurrentPage(newPage)
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
            widthHeight={widthHeight}
            />
      })
    return (
        <div className="dog-search-result-container">
            <h2>ADOPTABLE DOGS</h2>
            <p>RESULTS: {total}</p>
            <div className="adoptable-dog-list">
                {adoptionList}
            </div>
            {!prev ? <></> : <button onClick={()=>navDirection('prev')}>prev</button>}
            <>{pageNumberElements}</>
            {!next ? <></> :<button onClick={()=>navDirection('next')}>next</button>}
        </div>
        
    )
}