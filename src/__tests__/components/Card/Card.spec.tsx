import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import Card from '../../../components/Card'

const mockCard = {
  id: 1,
  url: 'img-url',
  name: 'bulbasaur',
  types: ['grass', 'poison'],
}

describe('Card', () => {
  it('should render a card pokemon', () => {
    const history = createMemoryHistory()
    const { getByText, getByAltText } = render(
      <Router history={history}>
        <Card {...mockCard} />
      </Router>,
    )

    const name = getByText(mockCard.name)
    const id = getByText(mockCard.id.toString().padStart(4, '0'))
    const img = getByAltText(mockCard.name)
    const type = getByText('grass')

    expect(name).toBeInTheDocument()
    expect(id).toBeInTheDocument()
    expect(img).toBeInTheDocument()
    expect(type).toBeInTheDocument()
  })
})
