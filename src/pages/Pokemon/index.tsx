import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
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

const Pokemon: React.FC = () => {
  const { getPokemon } = usePokemon()
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const [notFounded, setNotFounded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon>({} as IPokemon)
  const [currentImg, setCurrentImg] = useState('')

  const handleMouse = (enter: boolean) => {
    if (enter) {
      setCurrentImg(currentPokemon.sprites.back_default)
    } else {
      setCurrentImg(currentPokemon.sprites.front_default)
    }
  }

  const handleBack = () => {
    history.goBack()
  }

  useEffect(() => {
    const numberId = Number(id)
    setLoading(true)
    getPokemon(numberId)
      .then(pokemon => {
        setCurrentPokemon(pokemon)
        setCurrentImg(pokemon.sprites.front_default)
      })
      .catch(() => {
        setNotFounded(true)
      })
      .finally(() => setLoading(false))
  }, [id, getPokemon])

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
        currentImg={currentImg}
        notFounded={notFounded}
        name={currentPokemon.name}
        id={currentPokemon.id}
        loading={loading}
        height={currentPokemon.height}
        weight={currentPokemon.weight}
        base_experience={currentPokemon.base_experience}
        abilities={abilities}
        types={types}
        handleBack={handleBack}
        handleMouse={handleMouse}
      />
    </div>
  )
}

export default Pokemon
