import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  usePokemon,
  Pokemon,
  PokemonMoreInfo,
} from '../../contexts/pokemonContext'
import styles from './styles.module.css'

type PokemonData = Omit<Pokemon, 'types'> & PokemonMoreInfo

interface StatsType {
  hp: number
  defense: number
  attack: number
  'special-attack': number
  'special-defense': number
  speed: number
}

const Info: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { pokemonMapped, getPokemon } = usePokemon()
  const [currentPokemon, setCurrentPokemon] = useState<PokemonData>(
    {} as PokemonData,
  )
  const [selected, setSelected] = useState(0)
  const [currentImg, setCurrentImg] = useState('')
  const handleClick = (value: number) => setSelected(value)

  const handleMouse = (enter: boolean) => {
    if (enter) {
      setCurrentImg(currentPokemon.sprites.back_default)
    } else {
      setCurrentImg(currentPokemon.sprites.front_default)
    }
  }

  useEffect(() => {
    const numberId = Number(id)
    if (pokemonMapped[numberId]) {
      setCurrentPokemon(pokemonMapped[numberId])
      setCurrentImg(pokemonMapped[numberId].sprites.front_default)
    } else {
      getPokemon(numberId)
    }
  }, [pokemonMapped, id, getPokemon])

  const abilities = useMemo(
    () => currentPokemon.abilities?.map(a => `${a.ability.name} `),
    [currentPokemon],
  )
  const types = useMemo(
    () => currentPokemon.types?.map(t => `${t.type.name} `),
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
    <div className={styles.containerInfo}>
      <div className={styles.content}>
        <h1>{currentPokemon.name}</h1>
        <span>#{currentPokemon.id?.toString().padStart(4, '0')}</span>
      </div>
      <div
        onMouseEnter={() => handleMouse(true)}
        onMouseLeave={() => handleMouse(false)}
      >
        <img loading="lazy" src={currentImg} alt={currentPokemon.name} />
      </div>
      <section className={styles.info}>
        <button
          type="button"
          onClick={() => handleClick(0)}
          className={selected === 0 ? styles.selected : ''}
        >
          Sobre
        </button>
        <button
          type="button"
          onClick={() => handleClick(1)}
          className={selected === 1 ? styles.selected : ''}
        >
          Base status
        </button>
      </section>
      <section className={styles.divider} />
      {selected === 0 && (
        <section className={styles.about}>
          <table cellPadding={0}>
            <tbody>
              <tr>
                <th>Nome</th>
                <td>{currentPokemon.name}</td>
              </tr>
              <tr>
                <th>Altura</th>
                <td>{currentPokemon.height} cm</td>
              </tr>
              <tr>
                <th>Peso</th>
                <td>{currentPokemon.weight / 10} kg</td>
              </tr>
              <tr>
                <th>Habilidade(s)</th>
                <td>{abilities}</td>
              </tr>
              <tr>
                <th>Tipo(s)</th>
                <td>{types}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
      {selected === 1 && (
        <section className={styles.about}>
          <table cellPadding={0}>
            <tbody>
              <tr>
                <th>HP</th>
                <td>{stats.hp}</td>
              </tr>
              <tr>
                <th>Attack</th>
                <td>{stats.attack}</td>
              </tr>
              <tr>
                <th>Defense</th>
                <td>{stats.defense}</td>
              </tr>
              <tr>
                <th>Sp. Atk</th>
                <td>{stats['special-attack']}</td>
              </tr>
              <tr>
                <th>Sp. Def</th>
                <td>{stats['special-defense']}</td>
              </tr>
              <tr>
                <th>Speed</th>
                <td>{stats.speed}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
    </div>
  )
}

export default Info
