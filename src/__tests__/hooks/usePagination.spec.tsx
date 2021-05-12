import { renderHook } from '@testing-library/react-hooks'
import usePagination from '../../hooks/usePagination'

jest.mock('../../contexts/pokemonContext', () => ({
  usePokemon: () => ({
    totalPokemon: 40,
  }),
}))

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    search: '/',
  }),
}))

describe('Pagination hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should return page and totalPage', () => {
    const { result } = renderHook(() => usePagination())
    expect(result.current.page).toEqual(1)
    expect(result.current.totalPages).toEqual(2)
  })
  it('should return page and totalPage', () => {
    const { result } = renderHook(() => usePagination())
    expect(result.current.page).toEqual(1)
    expect(result.current.totalPages).toEqual(2)
  })
})
