import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import { PokemonInList } from '../../contexts/pokemonContext'

type CardProps = PokemonInList

const Card: React.FC<CardProps> = ({ name, id, url, types }) => {
  return (
    <div className={styles.containerCard}>
      <Link to={`pokemon/${id}`} className={styles.card}>
        <img loading="lazy" src={url} alt={name} />
        <span className={styles.number}>{id.toString().padStart(4, '0')}</span>
        <span className={styles.name}>{name}</span>
        <div className={styles.types}>
          {types.map(type => (
            <span key={`${id}-${type}`}>{type}</span>
          ))}
        </div>
      </Link>
    </div>
  )
}

export default Card
