import React from 'react'
import styles from './styles.module.css'

interface CardProps {
  id: number
  name: string
  url: string
  types: string[]
}

const Card: React.FC<CardProps> = ({ name, id, url, types }) => {
  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        <img loading="lazy" src={url} alt={name} />
        <span className={styles.number}>{id}</span>
        <span className={styles.name}>{name}</span>
        <div className={styles.types}>
          {types.map(type => (
            <span key={`${id}-${type}`}>{type}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card
