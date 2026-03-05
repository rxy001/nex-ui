import { render, act, waitFor } from '@testing-library/react'
import { FadeInOutMotion } from '../../fadeInOutMotion/FadeInOutMotion'

describe('FadeInOutMotion', () => {
  it('should render children when open=true', async () => {
    const { getByTestId } = await act(async () =>
      render(
        <FadeInOutMotion open>
          <div data-testid='test-content'>Visible Content</div>
        </FadeInOutMotion>,
      ),
    )

    expect(getByTestId('test-content')).toBeInTheDocument()
  })

  it('should not render anything when open=false and keepMounted=false', async () => {
    const { queryByTestId } = await act(async () =>
      render(
        <FadeInOutMotion
          open={false}
          keepMounted={false}
          motionProps={{
            // @ts-expect-error
            'data-testid': 'test-motion',
          }}
        >
          <div data-testid='test-content'>Hidden Content</div>
        </FadeInOutMotion>,
      ),
    )
    expect(queryByTestId('test-motion')).not.toBeInTheDocument()
    expect(queryByTestId('test-content')).not.toBeInTheDocument()
  })

  it('should keep motion mounted when keepMounted=true', async () => {
    const { rerender, getByTestId } = await act(async () =>
      render(
        <FadeInOutMotion
          open={false}
          keepMounted
          motionProps={{
            // @ts-expect-error
            'data-testid': 'test-motion',
          }}
        >
          <div data-testid='test-content'>Always Mounted Content</div>
        </FadeInOutMotion>,
      ),
    )

    const motion = getByTestId('test-motion')
    const content = getByTestId('test-content')
    expect(motion).toBeInTheDocument()
    expect(content).toBeInTheDocument()

    // Rerender with open=true
    await act(async () => {
      rerender(
        <FadeInOutMotion
          open
          keepMounted
          motionProps={{
            // @ts-expect-error
            'data-testid': 'test-motion',
          }}
        >
          <div data-testid='test-content'>Always Mounted Content</div>
        </FadeInOutMotion>,
      )
    })
    expect(motion).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })

  it('should render correct styles based on open prop (keepMounted=false)', async () => {
    const { queryByTestId } = await act(async () =>
      render(
        <FadeInOutMotion
          open
          keepMounted={false}
          motionProps={{
            // @ts-expect-error
            'data-testid': 'test-motion',
          }}
        >
          <div>Style Test Content</div>
        </FadeInOutMotion>,
      ),
    )

    await waitFor(() =>
      expect(queryByTestId('test-motion')).toHaveStyle('opacity: 1'),
    )
  })

  it('should render correct styles based on open prop (keepMounted=true)', async () => {
    const { queryByTestId, rerender } = await act(async () =>
      render(
        <FadeInOutMotion
          open={false}
          keepMounted
          motionProps={{
            // @ts-expect-error
            'data-testid': 'test-motion',
          }}
        >
          <div>Style Test Content</div>
        </FadeInOutMotion>,
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
        <FadeInOutMotion
          open
          keepMounted
          motionProps={{
            // @ts-expect-error
            'data-testid': 'test-motion',
          }}
        >
          <div>Style Test Content</div>
        </FadeInOutMotion>,
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
