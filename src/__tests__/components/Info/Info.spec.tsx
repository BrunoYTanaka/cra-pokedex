import { fireEvent, render } from '@testing-library/react'
import Info from '../../../components/Info'

const mockedGoBack = jest.fn()

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    goBack: mockedGoBack,
  }),
}))

const mockedPokemon = {
  frontImg: {
    url: 'front-url-mg',
    name: 'front-img',
  },
  backImg: {
    url: 'back-url-img',
    name: 'back-img',
  },
  handleBack: () => mockedHandleBack,
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
    const img = getByAltText('front-img')
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
    const img = getByAltText('front-img')
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

  it('should test buttons img ', async () => {
    const { queryAllByRole, getByAltText } = render(<Info {...mockedPokemon} />)
    const [, frontImgBtn, backImgBtn] = queryAllByRole('button')

    fireEvent.click(frontImgBtn)
    const frontImg = getByAltText('front-img')
    expect(frontImg).toBeInTheDocument()
    fireEvent.click(backImgBtn)
    const backImg = getByAltText('back-img')
    expect(backImg).toBeInTheDocument()
  })

  it('should go back', () => {
    const { queryAllByRole } = render(<Info {...mockedPokemon} />)
    const [goBackBtn] = queryAllByRole('button')

    fireEvent.click(goBackBtn)
    expect(mockedGoBack).toHaveBeenCalled()
  })
})
