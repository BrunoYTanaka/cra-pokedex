import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, History } from 'history'
import Pokedex from '../../../pages/Pokedex'
import * as PokemonData from '../../../contexts/pokemonContext'

const mockedPokemonData = PokemonData as jest.Mocked<typeof PokemonData>

let history: History

describe('Pokedex Page', () => {
  beforeEach(() => {
    history = createMemoryHistory()
    history.push('/')
  })
  it('should render pokedex', () => {
    jest.spyOn(mockedPokemonData, 'usePokemon').mockImplementationOnce(() => ({
      getPokemon: jest.fn(),
      pokemonMapped: {},
      totalPokemon: 1,
      allPokemonPerPage: [
        {
          id: 6,
          name: 'charizard',
          types: ['fire'],
          url: 'front-img',
        },
      ],
    }))
    const { getByText } = render(
      <Router history={history}>
        <Pokedex />
      </Router>,
    )
    const name = getByText('charizard')
    expect(name).toBeInTheDocument()
  })
  it('should render pokedex without pokemon', () => {
    jest.spyOn(mockedPokemonData, 'usePokemon').mockImplementationOnce(() => ({
      getPokemon: jest.fn(),
      pokemonMapped: {},
      totalPokemon: 1,
      allPokemonPerPage: [],
    }))
    const { getByText } = render(
      <Router history={history}>
        <Pokedex />
      </Router>,
    )
    const msg = getByText('Nenhum resultado encontrado')
    expect(msg).toBeInTheDocument()
  })
})
