import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './styles.module.css'

const NotFound: React.FC = () => {
  const history = useHistory()
  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className={styles.containerNotFound}>
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

export default NotFound
