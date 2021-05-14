import React from 'react'
import { ImSpinner9 } from 'react-icons/im'
import styles from './styles.module.css'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import { usePokemon } from '../../contexts/pokemonContext'

const Pokedex: React.FC = () => {
  const { allPokemonPerPage, loading } = usePokemon()

  const Content = () => (
    <>
      {allPokemonPerPage.length > 0 ? (
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
      ) : (
        <div className={styles.withoutResults}>
          <p>Nenhum resultado encontrado</p>
        </div>
      )}
    </>
  )

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <ImSpinner9 size={36} className={styles.spinner} />
        </div>
      ) : (
        <Content />
      )}
    </>
  )
}

export default Pokedex
