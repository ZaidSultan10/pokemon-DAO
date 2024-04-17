import Link from "next/link";
import React from "react"
import styled from "styled-components";

interface IPokemonCardProps {
    name : string,
    url : string,
    handleSelectedPokemon : (url: string) => Promise<void>
}

const PokemonCard : React.FC <IPokemonCardProps> = ({name, url, handleSelectedPokemon}) => {
    let removeUrlLastCharacter = url.substring(0, url.length - 1)
    let pokemonId : string = removeUrlLastCharacter.split('/')[removeUrlLastCharacter.split('/').length - 1]
    return (
        <Link href={`/pokemon/${pokemonId}`}>
            {name}
         {/* <Heading onClick={() => handleSelectedPokemon(url)}>{name}</Heading> */}
        </Link>
    )
}

const PokemonCardSection = styled.section`
    display:flex;
`
const Heading = styled.h1`
  font-size: 1rem;
  font-weight: 800;
  text-decoration: underline;
`;

export default PokemonCard