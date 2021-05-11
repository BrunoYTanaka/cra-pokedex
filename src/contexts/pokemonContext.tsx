import React, { createContext, useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../services/api'
import usePagination from '../hooks/usePagination'

export interface Pokemon {
  id: number
  name: string
  url: string
  types: string[]
}

export interface PokemonMoreInfo {
  height: number
  weight: number
  base_experience: number
  sprites: {
    back_default: string
    front_default: string
  }
  abilities: {
    ability: {
      name: string
    }
  }[]
  types: {
    type: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
}

interface PokemonPaginated {
  [key: number]: Pokemon[]
}

interface PokemonMapped {
  [key: number]: Omit<Pokemon, 'types'> & PokemonMoreInfo
}

interface PokemonContextData {
  allPokemonPerPage: Pokemon[]
  pokemonMapped: PokemonMapped
  getPokemon: (id: number) => Promise<GetPokemonResponse>
}

interface AllPokemonResponse {
  name: string
  url: string
}

interface GetAllPokemonResponse {
  results: AllPokemonResponse[]
}

type GetPokemonResponse = Omit<Pokemon, 'types'> & PokemonMoreInfo

export const PokemonContext = createContext({} as PokemonContextData)

export const PokemonProvider: React.FC = ({ children }) => {
  const [allPokemon, setAllPokemon] = useState<PokemonPaginated>({})
  const [allPokemonPerPage, setAllPokemonPerPage] = useState<Pokemon[]>([])
  const [pokemonMapped, setPokemonMapped] = useState<PokemonMapped>({})
  const location = useLocation()
  const page = usePagination()

  useEffect(() => {
    const loadPokemon = async () => {
      const res = await api.get<GetAllPokemonResponse>(`/pokemon`, {
        params: {
          offset: (page - 1) * 20,
        },
      })
      const createPokemonObject = async ({
        results,
      }: GetAllPokemonResponse) => {
        const getPokemonByName = async ({
          name,
        }: AllPokemonResponse): Promise<void> => {
          const { data } = await api.get<GetPokemonResponse>(`/pokemon/${name}`)
          setPokemonMapped(currentPokemonMapped => ({
            ...currentPokemonMapped,
            [data.id]: data,
          }))
          setAllPokemon(currentState => {
            const newState = { ...currentState }
            if (!newState[page]) {
              newState[page] = []
            }
            const hasDuplicate = newState[page].find(p => p.id === data.id)
            if (hasDuplicate) {
              return newState
            }
            newState[page].push({
              name,
              url: data.sprites.front_default,
              id: data.id,
              types: data.types.map(type => type.type.name),
            })
            return newState
          })
        }
        results.reduce(async (previousPromise: Promise<void>, nextName) => {
          await previousPromise
          return getPokemonByName(nextName)
        }, Promise.resolve())
      }
      return createPokemonObject(res.data)
    }
    if (!allPokemon[page] && location.pathname === '/') {
      loadPokemon()
    }
  }, [allPokemon, page, location.pathname])

  useEffect(() => {
    if (location.pathname === '/') {
      const newState = { ...allPokemon }
      setAllPokemonPerPage(newState[Number(page)] || [])
    }
  }, [allPokemon, page, location.pathname])

  const getPokemon = async (id: number) => {
    if (pokemonMapped[id]) {
      return pokemonMapped[id]
    }
    const res = await api.get(`/pokemon/${id}`)
    setPokemonMapped(currentPokemonMapped => ({
      ...currentPokemonMapped,
      [res.data.id]: res.data,
    }))
    return res.data
  }

  return (
    <PokemonContext.Provider
      value={{ allPokemonPerPage, pokemonMapped, getPokemon }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemon = (): PokemonContextData => {
  const { allPokemonPerPage, pokemonMapped, getPokemon } = useContext(
    PokemonContext,
  )
  return { allPokemonPerPage, pokemonMapped, getPokemon }
}
