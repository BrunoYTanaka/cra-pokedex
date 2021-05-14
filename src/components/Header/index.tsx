import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const Header: React.FC = () => {
  return (
    <div className={styles.containerHeader}>
      <Link to="/">Pokedex</Link>
    </div>
  )
}

export default Header
