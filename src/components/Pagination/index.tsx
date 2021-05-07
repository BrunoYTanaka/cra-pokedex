import React from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import styles from './styles.module.css'

const Pagination: React.FC = () => {
  return (
    <div className={styles.containerPagination}>
      <button type="button">
        <FaArrowLeft size={24} />
      </button>
      <span>1</span>
      <button type="button">
        <FaArrowRight size={24} />
      </button>
    </div>
  )
}

export default Pagination
