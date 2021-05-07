import React from 'react'
import styles from './styles.module.css'

const Card: React.FC = () => {
  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        <img
          loading="lazy"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
          alt="bulbasaur"
        />
        <span className={styles.number}>001</span>
        <span className={styles.name}>Bulbasaur</span>
        <div className={styles.types}>
          <span>grass</span>
          <span>poison</span>
        </div>
      </div>
    </div>
  )
}

export default Card
