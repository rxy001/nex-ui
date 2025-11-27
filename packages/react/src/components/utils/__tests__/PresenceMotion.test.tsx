import { render, act, waitFor } from '@testing-library/react'
import { PresenceMotion } from '../PresenceMotion'

describe('PresenceMotion', () => {
  it('should render children when open=true', async () => {
    const { getByTestId } = await act(async () =>
      render(
        <PresenceMotion open>
          <div data-testid='test-content'>Visible Content</div>
        </PresenceMotion>,
      ),
    )

    expect(getByTestId('test-content')).toBeInTheDocument()
  })

  it('should not render anything when open=false and keepMounted=false', async () => {
    const { queryByTestId } = await act(async () =>
      render(
        <PresenceMotion
          open={false}
          keepMounted={false}
          data-testid='test-motion'
        >
          <div data-testid='test-content'>Hidden Content</div>
        </PresenceMotion>,
      ),
    )
    expect(queryByTestId('test-motion')).not.toBeInTheDocument()
    expect(queryByTestId('test-content')).not.toBeInTheDocument()
  })

  it('should keep motion mounted when keepMounted=true', async () => {
    const { rerender, getByTestId } = await act(async () =>
      render(
        <PresenceMotion open={false} keepMounted data-testid='test-motion'>
          <div data-testid='test-content'>Always Mounted Content</div>
        </PresenceMotion>,
      ),
    )

    const motion = getByTestId('test-motion')
    const content = getByTestId('test-content')
    expect(motion).toBeInTheDocument()
    expect(content).toBeInTheDocument()

    // Rerender with open=true
    await act(async () => {
      rerender(
        <PresenceMotion open keepMounted data-testid='test-motion'>
          <div data-testid='test-content'>Always Mounted Content</div>
        </PresenceMotion>,
      )
    })
    expect(motion).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })

  it('should render correct styles based on open prop (keepMounted=false)', async () => {
    const { queryByTestId } = await act(async () =>
      render(
        <PresenceMotion open keepMounted={false} data-testid='test-motion'>
          <div>Style Test Content</div>
        </PresenceMotion>,
      ),
    )

    await waitFor(() =>
      expect(queryByTestId('test-motion')).toHaveStyle('opacity: 1'),
    )
  })

  it('should render correct styles based on open prop (keepMounted=true)', async () => {
    const { queryByTestId, rerender } = await act(async () =>
      render(
        <PresenceMotion open={false} keepMounted data-testid='test-motion'>
          <div>Style Test Content</div>
        </PresenceMotion>,
      ),
    )

    const motion = queryByTestId('test-motion')
    await waitFor(async () =>
      expect(motion).toHaveStyle({
        opacity: '0',
        display: 'none',
      }),
    )

    await act(async () => {
      rerender(
        <PresenceMotion open keepMounted data-testid='test-motion'>
          <div>Style Test Content</div>
        </PresenceMotion>,
      )
    })

    await waitFor(async () =>
      expect(motion).toHaveStyle({
        opacity: '1',
        display: 'block',
      }),
    )
  })
})
