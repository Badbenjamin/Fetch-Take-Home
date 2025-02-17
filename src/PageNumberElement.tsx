import { useState, useEffect } from "react"

export default function PageNumberElement({pageNum, navToPageNum, currentPage}){
    const [currentColor, setCurrentColor] = useState('white')
  
    // if the pagenumberelement pageNum is the current page, set color to purple.
    useEffect(()=>{
        if (pageNum == currentPage){
            setCurrentColor('purple')
        } else {
            setCurrentColor('white')
        }
    }, [currentPage])
    

    return(
        <span style={{color : currentColor}} onClick={()=>navToPageNum(pageNum)}> {pageNum} </span>
    )
}