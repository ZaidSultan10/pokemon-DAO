'use client'
import { useCustomQuery } from "@/customHooks/useCustomQuery"
import React from "react"
import { GET_POKEMON_API } from "../../../../apis/api"

interface Params {
    id : string
}

const Pokemon = ({params} : {params : Params}) => {
    const allPokemonsQuery = useCustomQuery(`${GET_POKEMON_API}/${params.id}/`, `pokemonData${params.id}`)
    console.log('id ===>',params,allPokemonsQuery.data)
    return (
        <div>
            <p>{allPokemonsQuery?.data?.name}</p>
            <img src={allPokemonsQuery?.data?.sprites?.front_default} />
        </div>
    )
}

export default Pokemon