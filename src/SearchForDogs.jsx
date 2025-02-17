import Select from 'react-select'
import './App.css'
import { useEffect, useState } from 'react'
import Slider from './Slider'


export function SearchForDogs({setTotal, setNext, setPrev, setAdoptionArray, setCurrentPage}){
    const [breedNames, setBreedNames] = useState([])
    const [reactSelectOptions, setReactSelectOptions] = useState([])
    const [breedMatchList, setMatchList] = useState([])
    const [sortDirection, setSortDirection]= useState("asc")
    const [ageParams, setAgeParams] = useState([0,20])
    

    // get breed names to build reactSelect options
    useEffect(() => {
        fetch("https://frontend-take-home-service.fetch.com/dogs/breeds", {
        headers: {
            "Content-Type": "application/json",
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

    function handleBreedSelect(breedNameArray){
        let breedsToMatch = breedNameArray.map((breedName)=>{
          return breedName.value
        })
        setMatchList(breedsToMatch)
    }

    function selectChange(){
        setSortDirection(document.getElementById('sort').value)
    }

    // this function takes our search parameters, parameterizes them, and makes the GET request to GET dogs/search.
    function handleSearchSubmit(e){
        if (breedMatchList.length >= 100) {
            window.alert('please only enter 100 or less breed names')
            return
        }
        let breedQuery = ""
        if (breedMatchList.length == 1){
            breedQuery = breedMatchList
        } else if (breedMatchList.length > 1){
            for (const breed of breedMatchList){
            breedQuery += `&breeds=${breed}`
            }
        }
    
        let breeds = `breeds=${breedQuery}`
        let age= `&ageMin=${ageParams[0]}&ageMax=${ageParams[1]}`
        let sort = `&sort=breed:${sortDirection}`
        let url = 'https://frontend-take-home-service.fetch.com/dogs/search'
        if (breedQuery){
            url = `https://frontend-take-home-service.fetch.com/dogs/search?${breeds}${age}${sort}`
        } else {
            url = `https://frontend-take-home-service.fetch.com/dogs/search?${age}${sort}`
        }
        
        fetch(url, {
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
                window.alert('search request failed')
            }
        })
        .then((responseData)=>{
            console.log('resp dat',responseData)
            setTotal(responseData.total)
            setNext(responseData.next)
            setPrev(responseData.prev)
            setCurrentPage(1)
            const newAdoptionArray = responseData.resultIds.map((id)=>{
            return id
            })
            if (responseData.total  < 1) {
                window.alert('no restults. please refine search.')
            } else {
                console.log('i worked', newAdoptionArray)
            }
            setAdoptionArray(newAdoptionArray)
        })
    }

    return(
        <div className="search-for-dogs">
            <h2>SEARCH FOR DOGS</h2>
            <div className='top-search'>
                <>SEARCH BY BREED</>
                <Select options={reactSelectOptions}
                onChange={opt=>handleBreedSelect(opt)}
                isMulti
                />
            </div>
            <div className='middle-search'>
                <label for='sort'>SORT BY</label>
                <select name="a-z" id='sort' onChange={selectChange}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
            <Slider setAgeParams={setAgeParams} ageParams={ageParams}/> 
            </div>
            <div className='bottom-search'>
                <button onClick={handleSearchSubmit}>FIND DOGS</button>
            </div>
        </div>
    )
}