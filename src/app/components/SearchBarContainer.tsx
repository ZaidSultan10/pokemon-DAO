import Link from "next/link"
import React from "react"

interface ISearchBarParams {
    loading : boolean,
    pokemon : any
}

interface IPokemonData {
    name : string,
    url : string
}

const SearchBarContainer : React.FC<ISearchBarParams> = ({loading , pokemon}) => {
    const getPokemonId = (url : string) => {
        let removeUrlLastCharacter = url.substring(0, url.length - 1)
        let pokemonId : string = removeUrlLastCharacter.split('/')[removeUrlLastCharacter.split('/').length - 1]
        return pokemonId
    }
    
    return (
        <div style={{zIndex:999, minHeight:'80px', maxHeight:'320px', overflowY:'scroll', margin:'1rem 0'}}>
            {loading ? (
                <p>loading...</p>
            ) : (
                pokemon && pokemon.length > 0 && pokemon.map((item : IPokemonData) => (
                    <Link href={`/pokemon/${getPokemonId(item.url)}`}>{item.name}</Link>
                ))
            )}
        </div>
    )
}

export default SearchBarContainer