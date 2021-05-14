import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
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
    history.push('/')
    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>,
    )
    const name = getByText('Pokedex')
    expect(name).toBeInTheDocument()
  })
})
