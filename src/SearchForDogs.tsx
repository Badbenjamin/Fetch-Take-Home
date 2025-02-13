import Select from 'react-select'

export function SearchForDogs({reactSelectOptions, handleBreedSelect, selectChange, onFindMatches, clearMatches}){
    console.log(reactSelectOptions)
    return(
        <div className="search-for-dogs">
            <Select options={reactSelectOptions}
            onChange={opt=>handleBreedSelect(opt)}
            isMulti
            />
            <label for='sort'>Sort by</label>
            <select name="a-z" id='sort' onChange={selectChange}>
                <option value='asc'>A-Z</option>
                <option value='desc'>Z-A</option>
            </select>
            <button onClick={onFindMatches}>FIND MATCHES</button>
            <button onClick={clearMatches}>CLEAR MATCHES</button>
        </div>
    )
}