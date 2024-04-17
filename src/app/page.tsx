'use client'
import React, { useState } from "react";
// import Image from "next/image";
// import styles from "./page.module.css";
import { useQuery } from "@tanstack/react-query";
import { POKEMON_TYPES_API, GET_POKEMON_API } from "../../apis/api";
import axios from "axios";
import { useCustomQuery } from "@/customHooks/useCustomQuery";
import PokemonCard from "./components/PokemonCard";
import CategoriesCard from "./components/CategoriesCard";
import { wrap } from "module";
import SearchBar from "./components/SearchBar";
// import Link from "next/link";

export default function Home() {
  const [pokemons, setPokemons] = useState<any>(null)
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null)
  const pokemonTypeQuery = useCustomQuery(POKEMON_TYPES_API, `pokemonTypes`)
  const allPokemonsQuery = useCustomQuery(GET_POKEMON_API, `allPokemons`)
  const filteredPokemon = useCustomQuery(pokemons, `filteredPokemon`, false)
  const selectedPokemonQuery = useCustomQuery(selectedPokemon, `selectedPokemon`, false)

  const handleSelectedType = async (url : string) => {
    setPokemons(url)
    filteredPokemon.refetch()
  }
  const handleSelectedPokemon = async (url : string) => {
    setSelectedPokemon(url)
    selectedPokemonQuery.refetch()
  }
  console.log('pokemonTypeQuery ---',allPokemonsQuery.data?.results, pokemons, filteredPokemon.data?.pokemon)
  let totalPokemon = pokemons ? (filteredPokemon.data && filteredPokemon.data.pokemon) : (allPokemonsQuery.data && allPokemonsQuery.data.results)
  console.log('totalPokemon ---',totalPokemon,'===',selectedPokemonQuery?.data)
  return (
    <main>
      {pokemonTypeQuery.isLoading && <div>Loading...</div>}
      {pokemonTypeQuery.isError && <div>Error...</div>}
      <div style={{marginBottom : '12px'}}>
        <SearchBar />
      </div>
      <div style={{display : "flex", gap:5, flexWrap:'wrap'}}>{pokemonTypeQuery.data && pokemonTypeQuery.data.results 
      && pokemonTypeQuery.data.results.length > 0 
      && pokemonTypeQuery.data.results.map((item : any, i : number) => (
        // <Link href={item.url}>{item.name}</Link>
        <CategoriesCard name = {item.name} url = {item.url} handleSelectedType = {handleSelectedType} />
        // <button onClick={() => handleSelectedType(item.url)}>{item.name}</button>
      ))}
      </div>
      <div style={{display : "flex", gap:5, flexWrap:'wrap'}}>{totalPokemon
      && totalPokemon.length > 0 
      && totalPokemon.map((item : any, i : number) => (
        // <Link href={item.url}>{item.name}</Link>
        <PokemonCard name = {pokemons ? item.pokemon.name : item.name} url = {pokemons ? item.pokemon.url : item.url} handleSelectedPokemon = {handleSelectedPokemon} />
        // <button onClick={() => handleSelectedType(item.url)}>{item.name}</button>
      ))}
      </div>
      {!pokemons && (
        <div>
          <button disabled = {!allPokemonsQuery.data?.next} onClick={() => allPokemonsQuery.data?.next}>Next</button>
          <button disabled = {!allPokemonsQuery.data?.previous} onClick={() =>allPokemonsQuery.data?.previous}>Previous</button>
        </div>
      )}
    </main>
  );
}
