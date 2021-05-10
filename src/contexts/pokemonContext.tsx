import React, { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api'
import usePagination from '../hooks/usePagination'

interface Pokemon {
  id: number
  name: string
  url: string
  types: string[]
}

interface PokemonPaginated {
  [key: number]: Pokemon[]
}

interface PokemonContextData {
  allPokemonPerPage: Pokemon[]
}

interface AllPokemonResponse {
  name: string
  url: string
}

interface GetAllPokemonResponse {
  results: AllPokemonResponse[]
}

interface GetPokemonResponse {
  id: number
  name: string
  sprites: {
    front_default: string
  }
  types: {
    type: {
      name: string
    }
  }[]
}

export const PokemonContext = createContext({} as PokemonContextData)

export const PokemonProvider: React.FC = ({ children }) => {
  const [allPokemon, setAllPokemon] = useState<PokemonPaginated>({})
  const [allPokemonPerPage, setAllPokemonPerPage] = useState<Pokemon[]>([])
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
    if (!allPokemon[page]) {
      loadPokemon()
    }
  }, [allPokemon, page])

  useEffect(() => {
    const newState = { ...allPokemon }
    setAllPokemonPerPage(newState[Number(page)] || [])
  }, [allPokemon, page])

  return (
    <PokemonContext.Provider value={{ allPokemonPerPage }}>
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemon = (): Pokemon[] => {
  const { allPokemonPerPage } = useContext(PokemonContext)
  return allPokemonPerPage
}
