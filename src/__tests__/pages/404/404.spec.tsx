import { fireEvent, render } from '@testing-library/react'
import NotFound from '../../../pages/404'

const mockedGoBack = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedGoBack,
  }),
}))

describe('404 Page', () => {
  it('should render not found page', () => {
    const { getByText } = render(<NotFound />)
    const msg = getByText('Página não encontrada')
    expect(msg).toBeInTheDocument()
  })

  it('should goback to other page', async () => {
    const { getByText, getByRole } = render(<NotFound />)
    const msg = getByText('Página não encontrada')
    const btn = getByRole('button')
    expect(msg).toBeInTheDocument()
    fireEvent.click(btn)
    expect(mockedGoBack).toBeCalled()
  })
})
