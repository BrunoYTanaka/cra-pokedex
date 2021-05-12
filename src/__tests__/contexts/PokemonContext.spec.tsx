import { renderHook } from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'
import { PokemonProvider, usePokemon } from '../../contexts/pokemonContext'
import api from '../../services/api'

const mockApi = new MockAdapter(api)

const apiResponse = {
  count: 1,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
  ],
}

const defaultPokemon = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'front-img',
  },
  types: [
    {
      type: {
        name: 'grass',
      },
    },
  ],
}

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/',
  }),
}))

describe('Pokemon hook home page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockApi.reset()
    mockApi.onGet('/pokemon').reply(200, apiResponse)
    const pokemonName = '/pokemon'
    const url = new RegExp(`${pokemonName}/*`)
    mockApi.onGet(url).reply(config => {
      if (config.url) {
        return [200, defaultPokemon]
      }
      return [404]
    })
  })
  it('should load pokemon', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePokemon(), {
      wrapper: PokemonProvider,
    })
    await waitForNextUpdate()
    expect(result.current.allPokemonPerPage).toEqual([
      { id: 1, name: 'bulbasaur', types: ['grass'], url: 'front-img' },
    ])
    expect(result.current.totalPokemon).toEqual(1)
  })
  it('should get a pokemon already loaded', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePokemon(), {
      wrapper: PokemonProvider,
    })
    await waitForNextUpdate()

    const oldPokemon = await result.current.getPokemon(1)

    expect(oldPokemon).toEqual(defaultPokemon)
  })
  it('should load pokemon that was not load before', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePokemon(), {
      wrapper: PokemonProvider,
    })
    await waitForNextUpdate()

    const newPokemon = {
      id: 3,
      name: 'venusaur',
      sprites: {
        front_default: 'front-img',
      },
      types: [
        {
          type: {
            name: 'grass',
          },
        },
      ],
    }

    mockApi.reset()
    mockApi.onGet('/pokemon/3').replyOnce(200, newPokemon)
    result.current.getPokemon(3)

    await waitForNextUpdate()

    expect(result.current.pokemonMapped).toEqual({
      1: defaultPokemon,
      3: newPokemon,
    })
  })
})
