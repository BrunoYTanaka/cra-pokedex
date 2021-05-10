import React from 'react'
import Info from '../../components/Info'
import styles from './styles.module.css'

const Pokemon: React.FC = () => {
  return (
    <div className={styles.containerPokemon}>
      <Info />
    </div>
  )
}

export default Pokemon
