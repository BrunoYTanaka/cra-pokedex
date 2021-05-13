import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Info from '../../components/Info'
import { usePokemon, Pokemon as IPokemon } from '../../contexts/pokemonContext'
import styles from './styles.module.css'

export interface StatsType {
  hp: number
  defense: number
  attack: number
  'special-attack': number
  'special-defense': number
  speed: number
}

export interface ImgType {
  url: string
  name: string
}

const Pokemon: React.FC = () => {
  const { getPokemon } = usePokemon()
  const { id } = useParams<{ id: string }>()
  const [notFounded, setNotFounded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon>({} as IPokemon)

  useEffect(() => {
    const numberId = Number(id)
    setLoading(true)
    getPokemon(numberId)
      .then(pokemon => {
        setCurrentPokemon(pokemon)
      })
      .catch(() => {
        setNotFounded(true)
      })
      .finally(() => setLoading(false))
  }, [id, getPokemon])

  const frontImg = useMemo(
    () => ({
      url: currentPokemon.sprites?.front_default,
      name: `front-${currentPokemon.name}`,
    }),
    [currentPokemon],
  )

  const backImg = useMemo(
    () => ({
      url: currentPokemon.sprites?.back_default,
      name: `back-${currentPokemon.name}`,
    }),
    [currentPokemon],
  )

  const abilities = useMemo(
    () => currentPokemon.abilities?.map(a => a.ability.name).join(' - '),
    [currentPokemon],
  )

  const types = useMemo(
    () => currentPokemon.types?.map(t => t.type.name).join(' - '),
    [currentPokemon],
  )

  const stats = useMemo(
    () =>
      currentPokemon.stats?.reduce((acc, value) => {
        return {
          ...acc,
          [value.stat.name]: value.base_stat,
        }
      }, {}),
    [currentPokemon],
  ) as StatsType

  return (
    <div className={styles.containerPokemon}>
      <Info
        stats={stats}
        frontImg={frontImg}
        backImg={backImg}
        notFounded={notFounded}
        name={currentPokemon.name}
        id={currentPokemon.id}
        loading={loading}
        height={currentPokemon.height}
        weight={currentPokemon.weight}
        base_experience={currentPokemon.base_experience}
        abilities={abilities}
        types={types}
      />
    </div>
  )
}

export default Pokemon
