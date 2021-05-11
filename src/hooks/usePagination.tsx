import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { usePokemon } from '../contexts/pokemonContext'

interface Pagination {
  page: number
  totalPages: number
}

const usePagination = (): Pagination => {
  const location = useLocation<{ page: string }>()
  const { totalPokemon } = usePokemon()
  const totalPages = Math.ceil(totalPokemon / 20)
  const { page = 1 } = queryString.parse(location.search)
  return { page: Number(page) ? Number(page) : 1, totalPages }
}

export default usePagination
