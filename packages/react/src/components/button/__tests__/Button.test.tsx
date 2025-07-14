import { useState, createRef } from 'react'
import { fireEvent } from '@testing-library/react'
import {
  mountTest,
  renderWithNexUIProvider,
  rootClassNameTest,
} from '~/tests/shared'
import { Button } from '../index'
import { buttonClasses } from '../buttonClasses'
import type { ButtonProps } from '../index'

describe('Button', () => {
  mountTest(<Button />)
  rootClassNameTest(Button, 'test-class')

  it('should forward ref to Button', () => {
    const ref = createRef<HTMLButtonElement>()
    const { container } = renderWithNexUIProvider(
      <Button ref={ref}>Button</Button>,
    )
    const button = container.firstElementChild as HTMLButtonElement
    expect(ref.current).toBe(button)
  })

  it('renders correctly', () => {
    const { container } = renderWithNexUIProvider(<Button>Button</Button>)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should render with the root, variant-solid, size-md, radius-md, and color-blue classes but no others', () => {
    const { container } = renderWithNexUIProvider(<Button>Button</Button>)

    const button = container.firstElementChild

    expect(button).toHaveClass(buttonClasses.root)
    expect(button).toHaveClass(buttonClasses['variant-solid'])
    expect(button).toHaveClass(buttonClasses['size-md'])
    expect(button).toHaveClass(buttonClasses['radius-md'])
    expect(button).toHaveClass(buttonClasses['color-blue'])

    expect(button).not.toHaveClass(buttonClasses['variant-outlined'])
    expect(button).not.toHaveClass(buttonClasses['variant-text'])
    expect(button).not.toHaveClass(buttonClasses['color-green'])
    expect(button).not.toHaveClass(buttonClasses['color-cyan'])
    expect(button).not.toHaveClass(buttonClasses['color-orange'])
    expect(button).not.toHaveClass(buttonClasses['color-pink'])
    expect(button).not.toHaveClass(buttonClasses['color-purple'])
    expect(button).not.toHaveClass(buttonClasses['color-yellow'])
    expect(button).not.toHaveClass(buttonClasses['color-red'])
    expect(button).not.toHaveClass(buttonClasses['color-gray'])
    expect(button).not.toHaveClass(buttonClasses['size-sm'])
    expect(button).not.toHaveClass(buttonClasses['size-lg'])
    expect(button).not.toHaveClass(buttonClasses['radius-sm'])
    expect(button).not.toHaveClass(buttonClasses['radius-lg'])
    expect(button).not.toHaveClass(buttonClasses['icon-only'])
    expect(button).not.toHaveClass(buttonClasses.loading)
    expect(button).not.toHaveClass(buttonClasses.disabled)
    expect(button).not.toHaveClass(buttonClasses['full-width'])
    expect(button).not.toHaveClass(buttonClasses['disable-ripple'])
  })

  it('should add the appropriate color class to root element based on color prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Button color='red' data-testid='color-red'>
          Button
        </Button>
        <Button color='blue' data-testid='color-blue'>
          Button
        </Button>
        <Button color='cyan' data-testid='color-cyan'>
          Button
        </Button>
        <Button color='orange' data-testid='color-orange'>
          Button
        </Button>
        <Button color='pink' data-testid='color-pink'>
          Button
        </Button>
        <Button color='purple' data-testid='color-purple'>
          Button
        </Button>
        <Button color='gray' data-testid='color-gray'>
          Button
        </Button>
        <Button color='yellow' data-testid='color-yellow'>
          Button
        </Button>
        <Button color='green' data-testid='color-green'>
          Button
        </Button>
      </>,
    )

    expect(getByTestId('color-red')).toHaveClass(buttonClasses['color-red'])
    expect(getByTestId('color-blue')).toHaveClass(buttonClasses['color-blue'])
    expect(getByTestId('color-cyan')).toHaveClass(buttonClasses['color-cyan'])
    expect(getByTestId('color-orange')).toHaveClass(
      buttonClasses['color-orange'],
    )
    expect(getByTestId('color-pink')).toHaveClass(buttonClasses['color-pink'])
    expect(getByTestId('color-purple')).toHaveClass(
      buttonClasses['color-purple'],
    )
    expect(getByTestId('color-green')).toHaveClass(buttonClasses['color-green'])
    expect(getByTestId('color-yellow')).toHaveClass(
      buttonClasses['color-yellow'],
    )
    expect(getByTestId('color-green')).toHaveClass(buttonClasses['color-green'])
  })

  it('should add the appropriate variant class to root element based on variant prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Button variant='solid' data-testid='variant-solid'>
          Button
        </Button>
        <Button variant='outlined' data-testid='variant-outlined'>
          Button
        </Button>
        <Button variant='text' data-testid='variant-text'>
          Button
        </Button>
      </>,
    )

    expect(getByTestId('variant-solid')).toHaveClass(
      buttonClasses['variant-solid'],
    )
    expect(getByTestId('variant-outlined')).toHaveClass(
      buttonClasses['variant-outlined'],
    )
    expect(getByTestId('variant-text')).toHaveClass(
      buttonClasses['variant-text'],
    )
  })

  it('should add the appropriate radius class to root element based on radius prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <Button radius='sm' data-testid='radius-sm'>
          Button
        </Button>
        <Button radius='md' data-testid='radius-md'>
          Button
        </Button>
        <Button radius='lg' data-testid='radius-lg'>
          Button
        </Button>
        <Button radius='full' data-testid='radius-full'>
          Button
        </Button>
      </>,
    )

    expect(getByTestId('radius-sm')).toHaveClass(buttonClasses['radius-sm'])
    expect(getByTestId('radius-md')).toHaveClass(buttonClasses['radius-md'])
    expect(getByTestId('radius-lg')).toHaveClass(buttonClasses['radius-lg'])
    expect(getByTestId('radius-full')).toHaveClass(buttonClasses['radius-full'])
  })

  it('should add the appropriate iconOnly class to root element based on iconOnly prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button iconOnly data-testid='icon-only'>
        Button
      </Button>,
    )

    expect(getByTestId('icon-only')).toHaveClass(buttonClasses['icon-only'])
  })

  it('should add the appropriate fullWidth class to root element based on fullWidth prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button fullWidth data-testid='full-width'>
        Button
      </Button>,
    )

    expect(getByTestId('full-width')).toHaveClass(buttonClasses['full-width'])
  })

  it('should add the appropriate disableRipple class to root element based on disableRipple prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button disableRipple data-testid='disable-ripple'>
        Button
      </Button>,
    )

    expect(getByTestId('disable-ripple')).toHaveClass(
      buttonClasses['disable-ripple'],
    )
  })

  it('should trigger onClick function', () => {
    const onClick = jest.fn()
    const { container } = renderWithNexUIProvider(<Button onClick={onClick} />)
    fireEvent.click(container.firstElementChild!)
    expect(onClick).toHaveBeenCalled()
  })

  it('should ignore events when disabled', () => {
    const onClick = jest.fn()
    const { getByText } = renderWithNexUIProvider(
      <Button disabled onClick={onClick}>
        Btn Tag
      </Button>,
    )

    const button = getByText('Btn Tag')
    fireEvent.click(button)
    expect(button).toHaveClass(buttonClasses.disabled)
    expect(button).toHaveStyleRule('pointer-events', 'none')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('should support link button', () => {
    const { container } = renderWithNexUIProvider(
      <Button target='_blank' href='https://'>
        Link Button
      </Button>,
    )
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should render with start icon', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button startIcon={<span data-testid='start-icon'>Icon</span>}>
        Button
      </Button>,
    )
    const startIcon = getByTestId('start-icon')
    expect(startIcon).toBeInTheDocument()
    expect(startIcon.parentElement).toHaveClass(buttonClasses.icon)
    expect(startIcon.parentElement).toHaveClass(buttonClasses['start-icon'])
  })

  it('should render with end icon', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Button endIcon={<span data-testid='end-icon'>Icon</span>}>
        Button
      </Button>,
    )
    const endIcon = getByTestId('end-icon')
    expect(endIcon).toBeInTheDocument()
    expect(endIcon.parentElement).toHaveClass(buttonClasses.icon)
    expect(endIcon.parentElement).toHaveClass(buttonClasses['end-icon'])
  })

  it('should support to change loading', () => {
    const DefaultButton: React.FC = () => {
      const [loading, setLoading] = useState<ButtonProps['loading']>(false)
      return (
        <Button
          loading={loading}
          data-testid='button'
          onClick={() => setLoading(true)}
        >
          Button
        </Button>
      )
    }
    const { getByTestId } = renderWithNexUIProvider(<DefaultButton />)

    const button = getByTestId('button')
    fireEvent.click(button)
    expect(button).toHaveClass(buttonClasses.loading)
    expect(
      button.querySelector(`.${buttonClasses['icon-loading']}`),
    ).toBeInTheDocument()
  })

  it('should forward classes to Button', () => {
    const startIconClassName = 'test-start-icon-class'
    const endIconClassName = 'test-end-icon-class'

    const { container } = renderWithNexUIProvider(
      <Button
        classes={{
          startIcon: startIconClassName,
          endIcon: endIconClassName,
        }}
        startIcon={<span>start icon</span>}
        endIcon={<span>end icon</span>}
      >
        Button
      </Button>,
    )

    const button = container.firstElementChild
    const startIcon = button?.querySelector(`.${buttonClasses['start-icon']}`)
    const endIcon = button?.querySelector(`.${buttonClasses['end-icon']}`)

    expect(startIcon).toHaveClass(startIconClassName)
    expect(endIcon).toHaveClass(endIconClassName)
  })

  it('should support customized spinner', () => {
    const { container } = renderWithNexUIProvider(
      <Button
        loading
        spinner={<span data-testid='custom-spinner'>Custom Spinner</span>}
      >
        Button
      </Button>,
    )

    const button = container.firstElementChild
    const spinner = button?.querySelector(`.${buttonClasses['icon-loading']}`)

    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveTextContent('Custom Spinner')
  })

  it('should support spinner placement', () => {
    const { container, rerender } = renderWithNexUIProvider(
      <Button loading spinnerPlacement='start'>
        Button
      </Button>,
    )

    const startSpinner = container.firstElementChild?.querySelector(
      `.${buttonClasses['start-icon']}`,
    )

    expect(startSpinner).toBeInTheDocument()

    rerender(
      <Button loading spinnerPlacement='end'>
        Button
      </Button>,
    )

    const endSpinner = container.firstElementChild?.querySelector(
      `.${buttonClasses['end-icon']}`,
    )
    expect(endSpinner).toBeInTheDocument()
  })

  it('should forward slotProps to startIcon and endIcon', () => {
    const { container } = renderWithNexUIProvider(
      <Button
        startIcon={<span data-testid='start-icon'>Start Icon</span>}
        endIcon={<span data-testid='end-icon'>End Icon</span>}
        slotProps={{
          startIcon: { className: 'test-start-icon' },
          endIcon: { className: 'test-end-icon' },
        }}
      >
        Button
      </Button>,
    )

    const startIcon = container.querySelector('.test-start-icon')
    const endIcon = container.querySelector('.test-end-icon')

    expect(startIcon).toBeInTheDocument()
    expect(endIcon).toBeInTheDocument()
  })
})
