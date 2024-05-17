import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import Login from './Login'
import { MemoryRouter as Router } from 'react-router-dom'

describe('Test Login page', () => {
  it('Should login', () => {
    const { debug } = render(
      <Router>
        <Login />
      </Router>
    )
    debug()
  })
})
