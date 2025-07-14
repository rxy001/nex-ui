import { createRef } from 'react'
import { renderWithSystemProvider } from '~/tests/shared'
import { nex } from '../nex'

describe('nex', () => {
  it('should render a basic styled tag', () => {
    const { container, getByTestId } = renderWithSystemProvider(
      <nex.div data-testid='test-div'>Hello</nex.div>,
    )
    expect(getByTestId('test-div')).toBeInTheDocument()
    expect(container).toHaveTextContent('Hello')
  })

  it('should forward props except `as`', () => {
    const { getByTestId } = renderWithSystemProvider(
      <nex.button data-testid='test-btn' as='a'>
        Btn
      </nex.button>,
    )
    const el = getByTestId('test-btn')
    expect(el.tagName.toLowerCase()).toBe('a')
    expect(el).not.toHaveAttribute('as')
  })

  it('should apply sx prop', () => {
    const { getByTestId, rerender } = renderWithSystemProvider(
      <nex.div sx={{ color: 'red' }} data-testid='div'>
        div
      </nex.div>,
    )
    const el = getByTestId('div')
    expect(el).toHaveStyleRule('color', 'red')

    rerender(
      <nex.div
        sx={[{ color: 'blue' }]}
        data-testid='div'
        className='test-class'
      >
        div
      </nex.div>,
    )

    expect(el).toHaveStyleRule('color', 'blue')
    expect(el).toHaveClass('test-class')
  })

  it('should forward ref', () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = renderWithSystemProvider(
      <nex.div ref={ref} data-testid='forward-ref'>
        Forward Ref
      </nex.div>,
    )
    const el = getByTestId('forward-ref')
    expect(ref.current).toEqual(el)
  })

  it('should throw error when creating with undefined tag', () => {
    expect(() => {
      // @ts-expect-error
      nex()
    }).toThrow()
  })
})
