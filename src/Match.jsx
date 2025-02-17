import { useEffect, useState } from "react"
import './App.css'

export default function Match({match, widthHeight}){
    const [ourMatch, setOurMatch] = useState([])
    
    // match prop is the ID of our match returned from POST dogs/match
    // this useEffect listens for a change in that prop and then updates the Match Component
    useEffect(()=>{
        fetch('https://frontend-take-home-service.fetch.com/dogs', {
            headers: {
              "Content-Type": "application/json",
              // "Accept": 'application/json',
            },
            credentials: 'include',
            method: "POST",
            body : JSON.stringify([match])
          })
          .then((response)=> {
            if (response.ok) {
                return response.json()
            } else {
                window.alert('request failed')
            }
          })
          .then((matchData)=>{
            return setOurMatch(matchData)
          })
    },[match])
    
    if (ourMatch[0]){
        return(
            <div className="match">
                <h1>YOUR MATCH!</h1>
                <div className="match-pic">
                    <img className="dog-img" width={widthHeight.width/2} height={widthHeight.width/3} src={ourMatch[0].img} alt={ourMatch[0].name}/>
                </div>
                <div className="match-info">
                    <strong className="dog-text">BREED: {ourMatch[0].breed}</strong>
                    <br></br>
                    <strong>NAME: {ourMatch[0].name}</strong>
                    <br></br>
                    <strong>AGE: {ourMatch[0].age}</strong>
                    <br></br>
                    <strong>ZIP: {ourMatch[0].zip_code}</strong>
                </div>
            </div>
        )
    } else {
        return(
            <>Please choose dogs to get a match.</>
        )
    }    
}