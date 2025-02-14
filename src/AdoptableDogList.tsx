import { useState, useEffect } from "react"

import { AdoptableDog } from "./AdoptableDog"
import PageNumberElement from "./PageNumberElement"
import './App.css'

export default function AdoptableDogList({currentPage, setCurrentPage, handleDogSelection, selectedDogs, adoptionArray, setAdoptionArray, prev, setPrev, next, setNext, total, setTotal}){
    const [adoptableDogs, setAdoptableDogs] = useState([])
    // const [currentPage, setCurrentPage] = useState(1)
    console.log('cp', currentPage)
    const numberOfPagesArray = [...Array(Math.floor(total/25)).keys()];
   
    
    // adoptionArray is a list of dog ids
    // these ids are posted to the /dogs endpoint, and dog objects are returned
    // adoptableDogs is the array of these objects, and is used to populate our gallery with dog cards
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

    function navToPageNum(pageNum){
        console.log('disabled')
        // let pageDif = Math.abs(currentPage-pageNum)
        // let direction = null
        // if (next && pageNum > currentPage){
        //     direction = 'next'
        // } else if (prev && pageNum < currentPage){
        //     direction = 'prev'
        // } else {
        //     return
        // }
        
        
        // for (let i = 0; i <= pageDif; i ++){
        //   navDirection(direction)
        // }
    }

    const pageNumberElements = numberOfPagesArray.map((pageNum)=>{
        return <PageNumberElement key={pageNum} pageNum={pageNum + 1} currentPage={currentPage} navToPageNum={navToPageNum}/>
    })

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
            />
      })
    return (
        <div className="dog-search-result-container">
            <p>RESULTS: {total}</p>
            <div className="adoptable-dog-list">
                {adoptionList}
            </div>
            {!prev ? <></> : <a onClick={()=>navDirection('prev')}>prev</a>}
            <>{pageNumberElements}</>
            {!next ? <></> :<a onClick={()=>navDirection('next')}>next</a>}
        </div>
        
    )
}