import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import Info from '../../../components/Info'

const mockedHandleBack = jest.fn()
const mockedHandleMouse = jest.fn()

const mockedPokemon = {
  currentImg: {
    url: 'img-url',
    name: 'front-img-url',
  },
  handleBack: () => mockedHandleBack,
  handleMouse: () => mockedHandleMouse,
  loading: false,
  notFounded: false,
  id: 1,
  base_experience: 64,
  name: 'bulbasaur',
  stats: {
    hp: 45,
    attack: 46,
    defense: 47,
    'special-attack': 68,
    'special-defense': 65,
    speed: 49,
  },
  abilities: 'overgrow - chlorophyll',
  height: 7,
  types: 'grass - poison',
  weight: 6.9,
}

describe('Info', () => {
  it('should render a info pokemon', () => {
    const { getByText, getByAltText } = render(<Info {...mockedPokemon} />)
    const name = getByText(mockedPokemon.name)
    const img = getByAltText(mockedPokemon.currentImg.name)
    const height = getByText(`${mockedPokemon.height} cm`)
    expect(img).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(height).toBeInTheDocument()
  })

  it('should render a info base status pokemon', () => {
    const { queryByText, getByAltText, getByRole } = render(
      <Info {...mockedPokemon} />,
    )
    const baseStatusBtn = getByRole('button', { name: 'Base status' })
    fireEvent.click(baseStatusBtn)
    const img = getByAltText(mockedPokemon.currentImg.name)
    const hp = queryByText(mockedPokemon.stats.hp)
    const attack = queryByText(mockedPokemon.stats.hp)
    const height = queryByText(mockedPokemon.height)
    expect(img).toBeInTheDocument()
    expect(hp).toBeInTheDocument()
    expect(attack).toBeInTheDocument()
    expect(height).not.toBeInTheDocument()
  })

  it('should go and back infos', () => {
    const { queryByText, getByText, getByRole } = render(
      <Info {...mockedPokemon} />,
    )
    const baseStatusBtn = getByRole('button', { name: 'Base status' })
    fireEvent.click(baseStatusBtn)
    const hp = queryByText(mockedPokemon.stats.hp)
    expect(hp).toBeInTheDocument()
    const aboutBtn = getByRole('button', { name: 'Sobre' })
    fireEvent.click(aboutBtn)
    const height = getByText(`${mockedPokemon.height} cm`)
    expect(height).toBeInTheDocument()
  })

  it('should test mouse event ', async () => {
    const { getByAltText, rerender } = render(<Info {...mockedPokemon} />)
    const img = getByAltText(mockedPokemon.currentImg.name)
    expect(img).toBeInTheDocument()
    fireEvent.mouseEnter(img)
    fireEvent.mouseLeave(img)
    const newMockedPokemon = {
      ...mockedPokemon,
      currentImg: {
        url: 'img-url',
        name: 'back-img-url',
      },
    }
    rerender(<Info {...newMockedPokemon} />)
    const backImg = getByAltText('back-img-url')
    expect(backImg).toBeInTheDocument()
  })
})
