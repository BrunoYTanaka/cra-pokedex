import { renderHook, WrapperComponent } from '@testing-library/react-hooks'
import { Router } from 'react-router-dom'
import { createMemoryHistory, History } from 'history'
import usePagination from '../../hooks/usePagination'

jest.mock('../../contexts/pokemonContext', () => ({
  usePokemon: () => ({
    totalPokemon: 40,
  }),
}))

const wrapper: WrapperComponent<{
  history: History
}> = ({ children, history }) => {
  return <Router history={history}>{children}</Router>
}

let history: History

describe('Pagination hook', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    history = createMemoryHistory()
  })

  it('should return page and totalPage', () => {
    history.push({ search: 'page=25' })
    const { result } = renderHook(() => usePagination(), {
      wrapper,
      initialProps: { history },
    })
    expect(result.current.page).toEqual(25)
    expect(result.current.totalPages).toEqual(2)
  })
  it('should return page and totalPage even with invalid page', () => {
    history.push({ search: 'page=a' })
    const { result } = renderHook(() => usePagination(), {
      wrapper,
      initialProps: { history },
    })
    expect(result.current.page).toEqual(1)
    expect(result.current.totalPages).toEqual(2)
  })
})
