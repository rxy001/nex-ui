import { render } from '@testing-library/react'
import { useRef } from 'react'
import { Portal } from '../Portal'

describe('Portal', () => {
  it('render nothing on the server', () => {
    const { container } = render(
      <Portal>
        <div>Bar</div>
      </Portal>,
      {
        hydrate: true,
      },
    )
    expect(container.firstChild).toBeNull()
  })

  it('render to document.body by default', () => {
    const { container } = render(
      <Portal>
        <div>Bar</div>
      </Portal>,
    )
    expect(container.firstElementChild).toBeNull()
    expect(document.body.lastElementChild?.textContent).toBe('Bar')
  })

  it('should unmount when parent unmounts', () => {
    function Child() {
      const containerRef = useRef<HTMLDivElement>(null)
      return (
        <div>
          <div ref={containerRef} />
          <Portal container={() => containerRef.current}>
            <div id='test1' />
          </Portal>
        </div>
      )
    }

    function Parent(props: { show?: boolean }) {
      const { show = true } = props
      return <div>{show ? <Child /> : null}</div>
    }

    const { rerender } = render(<Parent />)
    expect(document.querySelectorAll('#test1').length).toBe(1)
    rerender(<Parent show={false} />)
    expect(document.querySelectorAll('#test1').length).toBe(0)
  })

  it('should render to custom container', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const { container: renderContainer } = render(
      <Portal container={container}>
        <div id='test'>Bar</div>
      </Portal>,
    )
    expect(renderContainer.firstElementChild).toBeNull()
    expect(container.querySelector('#test')).toBeInTheDocument()

    // Clean up
    document.body.removeChild(container)
  })
})
