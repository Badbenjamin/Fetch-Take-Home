import Select from 'react-select'
import './App.css'
import { useEffect, useState } from 'react'

export function SearchForDogs({reactSelectOptions, handleBreedSelect, selectChange, onFindMatches, clearMatches}){
   
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
            <form>
                <label>MIN AGE</label>
                <input type='text'></input>
                <label>MAX AGE</label>
                <input type='text'></input>
            </form>
            </div>
            <div className='bottom-search'>
                <button onClick={onFindMatches}>FIND DOGS</button>
                <button onClick={clearMatches}>CLEAR DOGS</button>
            </div>
            
        </div>
    )
}