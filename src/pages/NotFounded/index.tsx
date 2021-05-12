import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './styles.module.css'

const NotFounded: React.FC = () => {
  const history = useHistory()
  const handleBack = () => {
    history.back()
  }

  return (
    <div className={styles.containerNotFounded}>
      <span>Página não encontrada</span>
      <span>
        Clique
        <button onClick={handleBack} type="button">
          aqui
        </button>
        para voltar
      </span>
    </div>
  )
}

export default NotFounded
