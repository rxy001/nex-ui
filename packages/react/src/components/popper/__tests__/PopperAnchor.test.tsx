import { renderWithNexUIProvider } from '~/tests/shared'
import { Popper, PopperAnchor } from '../index'

describe('PopperAnchor', () => {
  it("should return children as-is when PopperAnchor's children is not a valid React element", () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { container } = renderWithNexUIProvider(
      <Popper>
        {
          // @ts-expect-error
          <PopperAnchor>Invalid Element</PopperAnchor>
        }
      </Popper>,
    )

    expect(container.textContent).toBe('Invalid Element')
    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
})
