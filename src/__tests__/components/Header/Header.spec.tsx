import React from 'react'
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
    history.push('/pokemon/1')
    const { getByText } = render(
      <Router history={history}>
        <Header />
      </Router>,
    )
    const name = getByText('bulbasaur')
    expect(name).toBeTruthy()
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
    expect(name).toBeFalsy()
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
    expect(name).toBeFalsy()
  })
})
