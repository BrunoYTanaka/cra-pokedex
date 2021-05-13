import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render } from '@testing-library/react'
import Header from '../../../components/Header'

jest.mock('../../../contexts/pokemonContext', () => ({
  usePokemon: () => ({
    pokemonMapped: {
      1: {
        name: 'bulbasaur',
      },
    },
  }),
}))

describe('Header', () => {
  it('should render a header pokemon', () => {
    const history = createMemoryHistory()
    history.push('/pokemon/1')
    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>,
    )
    const name = getByText('bulbasaur')
    expect(name).toBeInTheDocument()
  })
  it('should render not render pokemon', () => {
    const history = createMemoryHistory()
    history.push('/pokemon/2')
    const { queryByText } = render(
      <Router history={history}>
        <Header />
      </Router>,
    )
    const name = queryByText('bulbasaur')
    expect(name).not.toBeInTheDocument()
  })
  it('should render not render pokemon with invalid id', () => {
    const history = createMemoryHistory()
    history.push('/pokemon/a')
    const { queryByText } = render(
      <Router history={history}>
        <Header />
      </Router>,
    )
    const name = queryByText('bulbasaur')
    expect(name).not.toBeInTheDocument()
  })
  it('should go to home page', () => {
    const history = createMemoryHistory()
    history.push('/pokemon/1')
    const { getByText, getByRole } = render(
      <Router history={history}>
        <Header />
      </Router>,
    )
    const name = getByText('bulbasaur')
    const btn = getByRole('button')
    fireEvent.click(btn)
    expect(name).toBeInTheDocument()
  })
})
