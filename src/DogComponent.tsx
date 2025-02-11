import { useEffect, useState} from "react"

export function DogComponent({breed, setMatchList, breedMatchList}){
    const [dogPic, setDogPic] = useState("")
    const [isSelected, setIsSelected] = useState(false)
    
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
        let newBreedMatchList = [...breedMatchList]
        newBreedMatchList.push(breed)
        setMatchList(newBreedMatchList)
        setIsSelected(true)
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
                <p>{isSelected ? "selected!" : ""}</p>
            </div>
        )
    }
   
}