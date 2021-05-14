import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render } from '@testing-library/react'
import Pagination from '../../../components/Pagination'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

jest.mock('../../../hooks/usePagination', () => () => ({
  page: 2,
  totalPages: 23,
}))

describe('Pagination', () => {
  it('should render pokemon pagination 2', () => {
    const history = createMemoryHistory()
    history.push('/?page=2')
    const { queryByText, queryAllByRole } = render(
      <Router history={history}>
        <Pagination />
      </Router>,
    )
    const [firstBtn, , lastBtn] = queryAllByRole('button')
    const page = queryByText('2')
    expect(firstBtn).toBeInTheDocument()
    expect(lastBtn).toBeInTheDocument()
    expect(page).toBeInTheDocument()
  })

  it('should call nextPage', async () => {
    const history = createMemoryHistory()
    history.push('/?page=2')
    const { queryAllByRole } = render(
      <Router history={history}>
        <Pagination />
      </Router>,
    )
    const [, , nextPageBtn] = queryAllByRole('button')
    expect(nextPageBtn).toBeInTheDocument()
    fireEvent.click(nextPageBtn)
    expect(mockHistoryPush).toBeCalledWith('/?page=3')
  })
  it('should call previousPage', async () => {
    const history = createMemoryHistory()
    history.push('/?page=2')
    const { queryAllByRole } = render(
      <Router history={history}>
        <Pagination />
      </Router>,
    )
    const [, previousPage] = queryAllByRole('button')
    expect(previousPage).toBeInTheDocument()
    fireEvent.click(previousPage)
    expect(mockHistoryPush).toBeCalledWith('/?page=1')
  })

  it('should call firstPage', async () => {
    const history = createMemoryHistory()
    history.push('/?page=5')
    const { queryAllByRole } = render(
      <Router history={history}>
        <Pagination />
      </Router>,
    )
    const [firstPage] = queryAllByRole('button')
    expect(firstPage).toBeInTheDocument()
    fireEvent.click(firstPage)
    expect(mockHistoryPush).toBeCalledWith('/?page=1')
  })
  it('should call lastPage', async () => {
    const history = createMemoryHistory()
    history.push('/?page=5')
    const { queryAllByRole } = render(
      <Router history={history}>
        <Pagination />
      </Router>,
    )
    const [, , , lastPage] = queryAllByRole('button')
    expect(lastPage).toBeInTheDocument()
    fireEvent.click(lastPage)
    expect(mockHistoryPush).toBeCalledWith('/?page=23')
  })
})
