import React from 'react'
import styles from './styles.module.css'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'

const Pokedex: React.FC = () => {
  return (
    <>
      <div className={styles.containerPokedex}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination />
    </>
  )
}

export default Pokedex
