import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const usePagination = (): number => {
  const location = useLocation<{ page: string }>()
  const { page = 1 } = queryString.parse(location.search)
  return Number(page) ? Number(page) : 1
}

export default usePagination
