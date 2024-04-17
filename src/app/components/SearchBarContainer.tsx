import React from "react"

interface ISearchBarParams {
    loading : boolean,
    pokemon : string
}

const SearchBarContainer : React.FC<ISearchBarParams> = ({loading , pokemon}) => {
    return (
        <div>
            {loading ? (
                <p>loading...</p>
            ) : (
                <p>{pokemon}</p>
            )}
        </div>
    )
}

export default SearchBarContainer