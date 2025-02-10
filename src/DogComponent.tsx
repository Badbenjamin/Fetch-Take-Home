import { useEffect, useState} from "react"

export function DogComponent({breed}){
    const [dogPic, setDogPic] = useState("")
    const breedName = breed.toLowerCase()
    // console.log(breedName)
    useEffect(()=>{
        fetch(`https://dog.ceo/api/breeds/image/random`)
        .then((response) => response.json())
        .then((data)=> {
            if (data.status == "success"){
                setDogPic(data.message)
            } else {
                console.log('failure')
            }
        })
        
    },[])
    // console.log(dogPic)
    // console.log(breed)

    function onClick(){
        console.log(breed)
    }

    if (dogPic == ""){
        return(
            <p>{breed}</p>
        )
    } else {
        return(
            <div onClick={onClick} className="dog-pic">
                <p>{breed}</p>
                <img width={100} height={100} src={dogPic}/>
            </div>
        )
    }
   
}