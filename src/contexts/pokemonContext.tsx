import React, { createContext, useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../services/api'
import usePagination from '../hooks/usePagination'

export interface PokemonInList {
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

export type Pokemon = Omit<PokemonInList, 'types'> & PokemonMoreInfo

interface PokemonPaginated {
  [key: number]: PokemonInList[]
}

interface PokemonMapped {
  [key: number]: Pokemon
}

interface AllPokemonResponse {
  name: string
  url: string
}

interface GetAllPokemonResponse {
  count: number
  results: AllPokemonResponse[]
}
interface PokemonContextData {
  allPokemonPerPage: PokemonInList[]
  pokemonMapped: PokemonMapped
  totalPokemon: number
  loading: boolean
  getPokemon: (id: number) => Promise<Pokemon>
}

export const PokemonContext = createContext({} as PokemonContextData)

export const PokemonProvider: React.FC = ({ children }) => {
  const [allPokemon, setAllPokemon] = useState<PokemonPaginated>({})
  const [loading, setLoading] = useState(false)
  const [totalPokemon, setTotalPokemon] = useState(0)
  const [allPokemonPerPage, setAllPokemonPerPage] = useState<PokemonInList[]>(
    [],
  )
  const [pokemonMapped, setPokemonMapped] = useState<PokemonMapped>({})
  const location = useLocation()
  const { page } = usePagination()

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
          const { data } = await api.get<Pokemon>(`/pokemon/${name}`)
          setPokemonMapped(currentPokemonMapped => ({
            ...currentPokemonMapped,
            [data.id]: data,
          }))
          setAllPokemon(currentAllPokemon => {
            const newAllPokemon = { ...currentAllPokemon }
            if (!newAllPokemon[page]) {
              newAllPokemon[page] = []
            }
            const hasDuplicate = newAllPokemon[page].find(p => p.id === data.id)
            if (hasDuplicate) {
              return newAllPokemon
            }
            newAllPokemon[page].push({
              name,
              url: data.sprites.front_default,
              id: data.id,
              types: data.types.map(type => type.type.name),
            })
            return newAllPokemon
          })
          setLoading(false)
        }
        results.reduce(async (previousPromise: Promise<void>, nextName) => {
          await previousPromise
          return getPokemonByName(nextName)
        }, Promise.resolve())
      }
      setTotalPokemon(res.data.count)
      return createPokemonObject(res.data)
    }
    if (!allPokemon[page] && location.pathname === '/') {
      setLoading(true)
      loadPokemon()
    }
  }, [allPokemon, page, location.pathname])

  useEffect(() => {
    if (location.pathname === '/') {
      const newState = { ...allPokemon }
      setAllPokemonPerPage(newState[page] || [])
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
      value={{
        allPokemonPerPage,
        pokemonMapped,
        getPokemon,
        totalPokemon,
        loading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemon = (): PokemonContextData => {
  const {
    allPokemonPerPage,
    pokemonMapped,
    getPokemon,
    totalPokemon,
    loading,
  } = useContext(PokemonContext)
  return { allPokemonPerPage, pokemonMapped, getPokemon, totalPokemon, loading }
}
