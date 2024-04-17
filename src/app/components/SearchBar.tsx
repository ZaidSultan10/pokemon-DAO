import { useDebouce } from "@/customHooks/useDebounce"
import axios from "axios"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { GET_POKEMON_API } from "../../../apis/api"
import SearchBarContainer from "./SearchBarContainer"

const SearchBar : React.FC = () => {
    const [search, setSearch] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [pokemon, setPokemon] = useState<any>(null)
    const debouncedValue = useDebouce(search)

    useEffect(() => {
        const loadPokemons = async () => {
          setLoading(true);
          const allPokemons = debouncedValue && await axios.get(`${GET_POKEMON_API}?limit=1302`);
          if(allPokemons && allPokemons?.data?.results){
              setPokemon(allPokemons?.data?.results?.filter((pokemon : any) => pokemon.name.includes(debouncedValue)));
          }
          setLoading(false);
        };
    
        loadPokemons();
      }, [debouncedValue]);
      console.log('pokemon --- ',pokemon)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearch(e.target.value);
    };
    return (
        <SearchBarSection>
            <SearchBarInput placeholder="Pokemon..." onChange={handleSearch} value={search} />
            {
                debouncedValue && pokemon && pokemon.length > 0 && (
                    <SearchBarContainer loading = {loading} pokemon = {pokemon} />
                )
            }
        </SearchBarSection>
    )
}

const SearchBarSection = styled.section`
    display: flex;
    justify-content : center;
    align-items : center;
`

const SearchBarInput = styled.input`
    outline : none;
    padding : 2px;
    border : 1px solid grey;
    border-radius : 4px;
`

export default SearchBar