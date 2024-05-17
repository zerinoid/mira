import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import Footer from './Footer'

describe('Test Footer comp', () => {
  it('Should render footer comp', () => {
    const { container } = render(
      <Router>
        <Footer />
      </Router>
    )
    const footerText = screen.getByText(/zerino desenvolvimento/i)
    expect(container).toMatchSnapshot()
    expect(footerText).toBeTruthy()
  })
})
