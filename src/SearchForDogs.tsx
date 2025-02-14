import Select from 'react-select'
import './App.css'
import { useEffect, useState } from 'react'
import Slider from './Slider'


export function SearchForDogs({setTotal, setNext, setPrev, setAdoptionArray}){
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

    function handleBreedSelect(breedNameArray){
        let breedsToMatch = breedNameArray.map((breedName)=>{
          return breedName.value
        })
        setMatchList(breedsToMatch)
    }

    function selectChange(){
        setSortDirection(document.getElementById('sort').value)
      }

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
        let breeds = `breeds=${breedQuery}`
        let age= `&ageMin=${ageParams[0]}&ageMax=${ageParams[1]}`
        let sort = `&sort=breed:${sortDirection}`
        let url = 'https://frontend-take-home-service.fetch.com/dogs/search'
        if (breedQuery){
            url = `https://frontend-take-home-service.fetch.com/dogs/search?${breeds}${age}${sort}`
        } else {
            url = `https://frontend-take-home-service.fetch.com/dogs/search?${age}${sort}`
        }
        
        console.log('url', url)
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
            
            setAdoptionArray(newAdoptionArray)
        })
    }

   
    return(
        <div className="search-for-dogs">
            <div className='top-search'>
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
                <button onClick={onFindMatches}>FIND DOGS</button>
                {/* <button onClick={clearMatches}>CLEAR DOGS</button> */}
            </div>
            
        </div>
    )
}