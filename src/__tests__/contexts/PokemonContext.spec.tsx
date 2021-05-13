import React from 'react'
import {
  renderHook,
  WrapperComponent,
  cleanup,
} from '@testing-library/react-hooks'
import MockAdapter from 'axios-mock-adapter'
import { Router } from 'react-router-dom'
import { createMemoryHistory, History } from 'history'
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

const wrapper: WrapperComponent<{
  history: History
}> = ({ children, history }) => {
  return (
    <Router history={history}>
      <PokemonProvider>{children}</PokemonProvider>
    </Router>
  )
}
let history: History

describe('Pokemon hook home page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    cleanup()
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
    history = createMemoryHistory()
    history.push('/')
  })
  it('should load pokemon', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePokemon(), {
      wrapper,
      initialProps: { history },
    })
    await waitForNextUpdate()
    expect(result.current.allPokemonPerPage).toEqual([
      { id: 1, name: 'bulbasaur', types: ['grass'], url: 'front-img' },
    ])
    expect(result.current.totalPokemon).toEqual(1)
  })
  it('should get a pokemon already loaded', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePokemon(), {
      wrapper,
      initialProps: { history },
    })
    await waitForNextUpdate()

    const oldPokemon = await result.current.getPokemon(1)

    expect(oldPokemon).toEqual(defaultPokemon)
  })
  it('should load pokemon that was not load before', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePokemon(), {
      wrapper,
      initialProps: { history },
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
  it('should not load pokemon when is not in home page', async () => {
    history.push('/pokemon/1')
    const { result } = renderHook(() => usePokemon(), {
      wrapper,
      initialProps: { history },
    })
    expect(result.current.allPokemonPerPage).toEqual([])
    expect(result.current.totalPokemon).toEqual(0)
  })
  it('should add duplicates pokemon', async () => {
    history.push('/?page=2')
    const newApiResponse = {
      count: 1,
      results: [
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ],
    }
    const newPokemon = {
      id: 6,
      name: 'charizard',
      sprites: {
        front_default: 'front-img',
      },
      types: [
        {
          type: {
            name: 'fire',
          },
        },
      ],
    }
    mockApi.reset()
    const pokemonName = '/pokemon'
    const url = new RegExp(`${pokemonName}/*`)
    mockApi.onGet('/pokemon').reply(200, newApiResponse)
    mockApi.onGet(url).reply(config => {
      if (config.url) {
        return [200, newPokemon]
      }
      return [404]
    })
    const { result, waitForNextUpdate } = renderHook(() => usePokemon(), {
      wrapper,
      initialProps: { history },
    })
    await waitForNextUpdate()

    expect(result.current.allPokemonPerPage).toEqual([
      {
        id: 6,
        name: 'charizard',
        types: ['fire'],
        url: 'front-img',
      },
    ])
    expect(result.current.totalPokemon).toEqual(1)
  })
})
