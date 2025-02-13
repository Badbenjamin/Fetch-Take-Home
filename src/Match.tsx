import { useEffect, useState } from "react"

export default function Match({match}){
    const [ourMatch, setOurMatch] = useState([])
    console.log('match', match)
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
          .then((response)=>response.json())
          .then((matchData)=>setOurMatch(matchData))
    },[match])
    console.log('om',ourMatch)
    if (ourMatch[0]){
        return(
            <div>
                <img src={ourMatch[0].img} alt={ourMatch[0].name}/>
                <p>BREED: {ourMatch[0].breed}</p>
                <p>NAME: {ourMatch[0].name}</p>
                <p>AGE: {ourMatch[0].age}</p>
                <p>ZIP: {ourMatch[0].zip_code}</p>
            </div>
        )
    } else {
        return(
            <>Match!</>
        )
    }    
}