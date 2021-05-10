import React from 'react'
import styles from './styles.module.css'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import { usePokemon } from '../../contexts/pokemonContext'

const Pokedex: React.FC = () => {
  const allPokemonPerPage = usePokemon()
  return (
    <>
      <div className={styles.containerPokedex}>
        {allPokemonPerPage.map(pokemon => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            url={pokemon.url}
            types={pokemon.types}
          />
        ))}
      </div>
      <Pagination />
    </>
  )
}

export default Pokedex
