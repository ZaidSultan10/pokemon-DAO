import React from "react"
import styled from "styled-components";

interface ICategoriesCardProps {
    name : string,
    url : string,
    handleSelectedType : (url: string) => Promise<void>
}

const CategoriesCard : React.FC <ICategoriesCardProps> = ({name, url, handleSelectedType}) => {
    return (
        <CategoriesCardSection>
         <Heading onClick={() => handleSelectedType(url)}>{name}</Heading>
        </CategoriesCardSection>
    )
}

const CategoriesCardSection = styled.div`
    display:flex;
    border:1px solid grey;
`
const Heading = styled.h1`
  font-size: 1rem;
  font-weight: 800;
  text-decoration: underline;
`;

export default CategoriesCard