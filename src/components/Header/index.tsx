import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { usePokemon } from '../../contexts/pokemonContext'
import styles from './styles.module.css'

const getIdFromUrl = (url: string): number => {
  const id = url.split('/')[2]

  return Number(id) ? Number(id) : -1
}

const Header: React.FC = () => {
  const location = useLocation()

  const id = getIdFromUrl(location.pathname)
  const [name, setName] = useState('Pokedex')

  const { pokemonMapped } = usePokemon()

  useEffect(() => {
    if (pokemonMapped[Number(id)]) {
      setName(pokemonMapped[Number(id)].name)
    } else {
      setName('Pokedex')
    }
  }, [id, pokemonMapped])
  return (
    <div className={styles.containerHeader}>
      <h1>{name}</h1>
    </div>
  )
}

export default Header
