export default function SearchBar({setSearchText}){

    function onHandleSearch(e){
        setSearchText(e.target.value)
    }

    return(
        <div className="search_bar">
            <label htmlFor="search"></label>
            <input
            type='text'
            id='search'
            // value=
            onChange={onHandleSearch}
            />
        </div>
    )
}