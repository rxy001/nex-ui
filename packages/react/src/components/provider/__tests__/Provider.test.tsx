import { render } from '@testing-library/react'
import { NexUIProvider } from '../index'
import { Button } from '../../button'
import { Divider } from '../../divider'
import { buttonClasses } from '../../button/buttonClasses'
import type { Theme } from '../../../types/theme'

describe('NexUIProvider', () => {
  it('should render with default props', () => {
    const { getByRole } = render(
      <NexUIProvider>
        <Button>Button</Button>
      </NexUIProvider>,
    )

    const button = getByRole('button')

    expect(button).toHaveClass('nui-btn-root')
    expect(button).toHaveClass(buttonClasses['color-blue'])
  })

  it('should use custom prefix', () => {
    const { getByRole, rerender } = render(
      <NexUIProvider>
        <Button>Button</Button>
      </NexUIProvider>,
    )

    const button = getByRole('button')

    expect(button).toHaveClass('nui-btn-root')

    rerender(
      <NexUIProvider prefix='custom'>
        <Button>Button</Button>
      </NexUIProvider>,
    )
    expect(button).toHaveClass('custom-btn-root')
  })

  it('should change primaryThemeColor dynamically', () => {
    const { getByRole, rerender } = render(
      <NexUIProvider>
        <Button>Button</Button>
      </NexUIProvider>,
    )

    const button = getByRole('button')
    expect(button).toHaveClass(buttonClasses['color-blue'])

    rerender(
      <NexUIProvider theme={{ primaryThemeColor: 'red' }}>
        <Button>Button</Button>
      </NexUIProvider>,
    )
    expect(button).toHaveClass(buttonClasses['color-red'])

    rerender(
      <NexUIProvider theme={{ primaryThemeColor: 'orange' }}>
        <Button>Button</Button>
      </NexUIProvider>,
    )
    expect(button).toHaveClass(buttonClasses['color-orange'])
  })

  it('should customize component styles by the styleOverrides object', () => {
    const { getByRole } = render(
      <NexUIProvider
        theme={{
          components: {
            Button: {
              styleOverrides: {
                variants: {
                  color: {
                    blue: {
                      root: {
                        bg: '#f0f0f0',
                      },
                    },
                  },
                  size: {
                    md: {
                      root: {
                        w: '200px',
                      },
                    },
                  },
                },
              },
            },
            Divider: {
              styleOverrides: {
                base: {
                  bg: 'gray',
                },
              },
            },
          },
        }}
      >
        <Button>Button</Button>
        <Divider />
      </NexUIProvider>,
    )

    const button = getByRole('button')
    const divider = getByRole('separator')

    expect(button).toHaveStyleRule('background-color', '#f0f0f0')
    expect(button).toHaveStyleRule('width', '200px')
    expect(divider).toHaveStyleRule('background-color', 'gray')
  })

  it('should customize component default props', () => {
    const { getByRole, rerender } = render(
      <NexUIProvider>
        <Button>Button</Button>
      </NexUIProvider>,
    )

    const button = getByRole('button')

    expect(button).toHaveClass(buttonClasses['color-blue'])
    expect(button).toHaveClass(buttonClasses['size-md'])

    const theme: Theme = {
      components: {
        Button: {
          defaultProps: { color: 'red', size: 'lg' },
        },
      },
    }

    rerender(
      <NexUIProvider theme={theme}>
        <Button>Button</Button>
      </NexUIProvider>,
    )

    expect(button).toHaveClass(buttonClasses['color-red'])
    expect(button).toHaveClass(buttonClasses['size-lg'])

    rerender(
      <NexUIProvider theme={theme}>
        <Button color='green' size='sm'>
          Button
        </Button>
      </NexUIProvider>,
    )
    expect(button).toHaveClass(buttonClasses['color-green'])
    expect(button).toHaveClass(buttonClasses['size-sm'])
  })
})

describe('Nested NexUIProvider', () => {
  it('should merge components from outer and inner providers', () => {
    const { getByTestId } = render(
      <NexUIProvider
        theme={{
          components: {
            Button: {
              styleOverrides: {
                slots: {
                  root: { width: '100px', margin: '10px' },
                },
              },
              defaultProps: { color: 'red', size: 'sm' },
            },
          },
        }}
      >
        <Button data-testid='outer-button'>Button</Button>
        <NexUIProvider
          theme={{
            components: {
              Button: {
                styleOverrides: {
                  slots: {
                    root: { width: '200px' },
                  },
                },
                defaultProps: { color: 'orange' },
              },
            },
          }}
        >
          <Button data-testid='inner-button'>Button</Button>
        </NexUIProvider>
      </NexUIProvider>,
    )

    const outerButton = getByTestId('outer-button')
    expect(outerButton).toHaveStyleRule('width', '100px')
    expect(outerButton).toHaveClass(buttonClasses['color-red'])
    expect(outerButton).toHaveClass(buttonClasses['size-sm'])

    const innerButton = getByTestId('inner-button')
    expect(innerButton).toHaveStyleRule('width', '200px')
    expect(innerButton).toHaveStyleRule('margin', '10px')
    expect(innerButton).toHaveClass(buttonClasses['color-orange'])
    expect(innerButton).toHaveClass(buttonClasses['size-sm'])
  })

  it('should override primaryThemeColor', () => {
    const { getByTestId } = render(
      <NexUIProvider>
        <Button data-testid='outer-button'>Button</Button>
        <NexUIProvider theme={{ primaryThemeColor: 'red' }}>
          <Button data-testid='inner-button'>Button</Button>
          <NexUIProvider theme={{ primaryThemeColor: 'orange' }}>
            <Button data-testid='innermost-button'>Button</Button>
          </NexUIProvider>
        </NexUIProvider>
      </NexUIProvider>,
    )

    const outerButton = getByTestId('outer-button')
    expect(outerButton).toHaveClass(buttonClasses['color-blue'])

    const innerButton = getByTestId('inner-button')
    expect(innerButton).toHaveClass(buttonClasses['color-red'])

    const innermostButton = getByTestId('innermost-button')
    expect(innermostButton).toHaveClass(buttonClasses['color-orange'])
  })
})
