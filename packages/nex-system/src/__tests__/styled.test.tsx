import { describe, it } from '@jest/globals'
import { render } from '@testing-library/react'
import { nex } from '../styled'
import { CSSSystemProvider } from '../Provider'

describe('as props', () => {
  it('as', () => {
    render(
      <CSSSystemProvider config={{}}>
        <nex.div />
      </CSSSystemProvider>,
    )
  })
})
