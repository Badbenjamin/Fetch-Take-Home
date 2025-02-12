
export function AdoptableDog({dog}){
    // console.log('addo dog', dog)
    function handleClick(){
        console.log(dog)
    }

    return(
        <div onClick={handleClick} className="adoptable-dog">
            <img width={100} height={100} src={dog.img} alt={dog.breed} />
            <br></br>
            <>NAME: {dog.name}</>
            <br></br>
            <>BREED: {dog.breed}</>
            <br></br>
            <>AGE: {dog.age}</>
            <br></br>
            <>ZIP: {dog.zip_code}</>
        </div>
    )
}