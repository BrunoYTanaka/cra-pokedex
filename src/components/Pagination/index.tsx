import React from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import usePagination from '../../hooks/usePagination'
import styles from './styles.module.css'

const Pagination: React.FC = () => {
  const history = useHistory()
  const page = usePagination()

  const handlePreviousPage = () => {
    history.push(`/?page=${page - 1}`)
  }

  const handleNextPage = () => {
    history.push(`/?page=${page + 1}`)
  }

  return (
    <div className={styles.containerPagination}>
      {page > 1 && (
        <button type="button" onClick={handlePreviousPage}>
          <FaArrowLeft size={24} />
        </button>
      )}
      <span>{page}</span>
      {page < 56 && (
        <button type="button" onClick={handleNextPage}>
          <FaArrowRight size={24} />
        </button>
      )}
    </div>
  )
}

export default Pagination
