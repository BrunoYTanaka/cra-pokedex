import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ImSpinner9 } from 'react-icons/im'
import { GrStatusWarning } from 'react-icons/gr'
import { BsArrowLeftShort } from 'react-icons/bs'
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
  const history = useHistory()
  const { pokemonMapped, getPokemon } = usePokemon()
  const [notFounded, setNotFounded] = useState(false)
  const [loading, setLoading] = useState(false)
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
  }, [pokemonMapped, id, getPokemon])

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

  const Content = () => {
    if (notFounded) {
      return (
        <div className={styles.notFound}>
          <GrStatusWarning size={36} />
          Pokemon não encontrado
        </div>
      )
    }
    return (
      <div className={styles.containerInfo}>
        <div className={styles.content}>
          <button type="button" onClick={handleBack}>
            <BsArrowLeftShort size={36} />
          </button>
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
                  <td style={{ textTransform: 'capitalize' }}>
                    {currentPokemon.name}
                  </td>
                </tr>
                <tr>
                  <th>Base de xp</th>
                  <td>{currentPokemon.base_experience} xp</td>
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
                  <td style={{ textTransform: 'capitalize' }}>{abilities}</td>
                </tr>
                <tr>
                  <th>Tipo(s)</th>
                  <td style={{ textTransform: 'capitalize' }}>{types}</td>
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

export default Info
