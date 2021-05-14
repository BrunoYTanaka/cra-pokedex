import { Router } from 'react-router-dom'
import { createMemoryHistory, History } from 'history'
import { render, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { PokemonContext } from '../../../contexts/pokemonContext'
import Pokemon from '../../../pages/Pokemon'

let history: History

const mockedPokemon = {
  url: 'https://pokeapi.co/api/v2/ability/66/',
  abilities: [
    {
      ability: {
        name: 'blaze',
        url: 'https://pokeapi.co/api/v2/ability/66/',
      },
    },
    {
      ability: {
        name: 'solar-power',
        url: 'https://pokeapi.co/api/v2/ability/94/',
      },
    },
  ],
  base_experience: 240,
  height: 17,
  id: 6,
  name: 'charizard',
  sprites: {
    back_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  },
  stats: [
    {
      base_stat: 78,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/',
      },
    },
    {
      base_stat: 84,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/',
      },
    },
    {
      base_stat: 78,
      effort: 0,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/',
      },
    },
    {
      base_stat: 109,
      effort: 3,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/',
      },
    },
    {
      base_stat: 85,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/',
      },
    },
    {
      base_stat: 100,
      effort: 0,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'fire',
        url: 'https://pokeapi.co/api/v2/type/10/',
      },
    },
    {
      slot: 2,
      type: {
        name: 'flying',
        url: 'https://pokeapi.co/api/v2/type/3/',
      },
    },
  ],
  weight: 905,
}

describe('Pokemon Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    history = createMemoryHistory()
    history.push('/pokemon/1')
  })
  it('should render Pokemon page', async () => {
    const promise = Promise.resolve()
    const { queryAllByText } = render(
      <Router history={history}>
        <PokemonContext.Provider
          value={{
            getPokemon: jest.fn(() => promise.then(() => mockedPokemon)),
            pokemonMapped: {},
            totalPokemon: 1,
            allPokemonPerPage: [],
          }}
        >
          <Pokemon />
        </PokemonContext.Provider>
      </Router>,
    )
    await act(() => promise)
    const [name] = queryAllByText('charizard')
    expect(name).toBeInTheDocument()
  })
  it('should not render Pokemon page not found', async () => {
    const { getByText } = render(
      <Router history={history}>
        <PokemonContext.Provider
          value={{
            getPokemon: jest.fn(() => Promise.reject(new Error('Not founded'))),
            pokemonMapped: {},
            totalPokemon: 1,
            allPokemonPerPage: [],
          }}
        >
          <Pokemon />
        </PokemonContext.Provider>
      </Router>,
    )
    await waitFor(() => {
      const msg = getByText('Pokemon não encontrado')
      expect(msg).toBeInTheDocument()
    })
  })
})
