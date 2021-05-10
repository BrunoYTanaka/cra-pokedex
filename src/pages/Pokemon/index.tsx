import React from 'react'
import { useParams } from 'react-router-dom'
import Info from '../../components/Info'
import styles from './styles.module.css'

const Pokemon: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <div className={styles.containerPokemon}>
      <Info />
    </div>
  )
}

export default Pokemon
