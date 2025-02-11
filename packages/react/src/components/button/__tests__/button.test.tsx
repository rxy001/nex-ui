import { describe, it, expect, jest } from '@jest/globals'
import { useState } from 'react'
import { fireEvent } from '@testing-library/react'
import { mountTest, refTest, renderWithNexProvider } from '~/tests/shared'
import { Button } from '../Button'
import type { ButtonProps } from '../types'
import { buttonClasses } from '../buttonClasses'

describe('Button', () => {
  mountTest(<Button />)
  refTest(<Button />)

  it('renders correctly', () => {
    const { container } = renderWithNexProvider(<Button>Button</Button>)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should render with the root, variant-filled, size-md, radius-md, and color-blue classes but no others', () => {
    const { container } = renderWithNexProvider(<Button>Button</Button>)

    const button = container.firstElementChild

    expect(button).toHaveClass(buttonClasses.root)
    expect(button).toHaveClass(buttonClasses['variant-filled'])
    expect(button).toHaveClass(buttonClasses['size-md'])
    expect(button).toHaveClass(buttonClasses['radius-md'])
    expect(button).toHaveClass(buttonClasses['color-blue'])

    expect(button).not.toHaveClass(buttonClasses['variant-link'])
    expect(button).not.toHaveClass(buttonClasses['variant-outlined'])
    expect(button).not.toHaveClass(buttonClasses['variant-text'])
    expect(button).not.toHaveClass(buttonClasses['color-green'])
    expect(button).not.toHaveClass(buttonClasses['color-cyan'])
    expect(button).not.toHaveClass(buttonClasses['color-orange'])
    expect(button).not.toHaveClass(buttonClasses['color-pink'])
    expect(button).not.toHaveClass(buttonClasses['color-purple'])
    expect(button).not.toHaveClass(buttonClasses['color-yellow'])
    expect(button).not.toHaveClass(buttonClasses['color-rose'])
    expect(button).not.toHaveClass(buttonClasses['color-gray'])
    expect(button).not.toHaveClass(buttonClasses['size-sm'])
    expect(button).not.toHaveClass(buttonClasses['size-lg'])
    expect(button).not.toHaveClass(buttonClasses['radius-sm'])
    expect(button).not.toHaveClass(buttonClasses['radius-lg'])
    expect(button).not.toHaveClass(buttonClasses['icon-only'])
    expect(button).not.toHaveClass(buttonClasses.loading)
    expect(button).not.toHaveClass(buttonClasses.disabled)
    expect(button).not.toHaveClass(buttonClasses['full-width'])
  })

  it('startIcon and endIcon should have icon class', () => {
    const { container } = renderWithNexProvider(
      <Button
        startIcon={<span>start icon</span>}
        endIcon={<span>end icon</span>}
      >
        Button
      </Button>,
    )
    const button = container.firstElementChild!
    const startIcon = button.querySelector(`.${buttonClasses['start-icon']}`)
    const endIcon = button.querySelector(`.${buttonClasses['end-icon']}`)
    expect(startIcon).toHaveClass(buttonClasses.icon)
    expect(endIcon).toHaveClass(buttonClasses.icon)
  })

  it('should add the appropriate color class to root element based on color prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <Button color="rose" data-testid="color-rose">
          Button
        </Button>
        <Button color="blue" data-testid="color-blue">
          Button
        </Button>
        <Button color="cyan" data-testid="color-cyan">
          Button
        </Button>
        <Button color="orange" data-testid="color-orange">
          Button
        </Button>
        <Button color="pink" data-testid="color-pink">
          Button
        </Button>
        <Button color="purple" data-testid="color-purple">
          Button
        </Button>
        <Button color="gray" data-testid="color-gray">
          Button
        </Button>
        <Button color="yellow" data-testid="color-yellow">
          Button
        </Button>
        <Button color="green" data-testid="color-green">
          Button
        </Button>
      </>,
    )

    expect(getByTestId('color-rose')).toHaveClass(buttonClasses['color-rose'])
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
    const { getByTestId } = renderWithNexProvider(
      <>
        <Button variant="filled" data-testid="variant-filled">
          Button
        </Button>
        <Button variant="link" data-testid="variant-link">
          Button
        </Button>
        <Button variant="outlined" data-testid="variant-outlined">
          Button
        </Button>
        <Button variant="text" data-testid="variant-text">
          Button
        </Button>
      </>,
    )

    expect(getByTestId('variant-filled')).toHaveClass(
      buttonClasses['variant-filled'],
    )
    expect(getByTestId('variant-link')).toHaveClass(
      buttonClasses['variant-link'],
    )
    expect(getByTestId('variant-outlined')).toHaveClass(
      buttonClasses['variant-outlined'],
    )
    expect(getByTestId('variant-text')).toHaveClass(
      buttonClasses['variant-text'],
    )
  })

  it('should add the appropriate size class to root element based on size prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <Button
          size="sm"
          data-testid="size-sm"
          startIcon={<span>start icon</span>}
          endIcon={<span>end icon</span>}
        >
          Button
        </Button>
        <Button
          size="md"
          data-testid="size-md"
          startIcon={<span>start icon</span>}
          endIcon={<span>end icon</span>}
        >
          Button
        </Button>
        <Button
          size="lg"
          data-testid="size-lg"
          startIcon={<span>start icon</span>}
          endIcon={<span>end icon</span>}
        >
          Button
        </Button>
      </>,
    )
    const smBtn = getByTestId('size-sm')
    const mdBtn = getByTestId('size-md')
    const lgBtn = getByTestId('size-lg')
    expect(smBtn).toHaveClass(buttonClasses['size-sm'])
    expect(smBtn.querySelector(`.${buttonClasses['start-icon']}`)).toHaveClass(
      buttonClasses['icon-size-sm'],
    )
    expect(smBtn.querySelector(`.${buttonClasses['end-icon']}`)).toHaveClass(
      buttonClasses['icon-size-sm'],
    )
    expect(mdBtn).toHaveClass(buttonClasses['size-md'])
    expect(mdBtn.querySelector(`.${buttonClasses['start-icon']}`)).toHaveClass(
      buttonClasses['icon-size-md'],
    )
    expect(mdBtn.querySelector(`.${buttonClasses['end-icon']}`)).toHaveClass(
      buttonClasses['icon-size-md'],
    )
    expect(lgBtn).toHaveClass(buttonClasses['size-lg'])
    expect(lgBtn.querySelector(`.${buttonClasses['start-icon']}`)).toHaveClass(
      buttonClasses['icon-size-lg'],
    )
    expect(lgBtn.querySelector(`.${buttonClasses['end-icon']}`)).toHaveClass(
      buttonClasses['icon-size-lg'],
    )
  })

  it('should add the appropriate radius class to root element based on radius prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <Button radius="sm" data-testid="radius-sm">
          Button
        </Button>
        <Button radius="md" data-testid="radius-md">
          Button
        </Button>
        <Button radius="lg" data-testid="radius-lg">
          Button
        </Button>
        <Button radius="full" data-testid="radius-full">
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
    const { getByTestId } = renderWithNexProvider(
      <Button iconOnly data-testid="icon-only">
        Button
      </Button>,
    )

    expect(getByTestId('icon-only')).toHaveClass(buttonClasses['icon-only'])
  })

  it('should add the appropriate fullWidth class to root element based on fullWidth prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <Button fullWidth data-testid="full-width">
        Button
      </Button>,
    )

    expect(getByTestId('full-width')).toHaveClass(buttonClasses['full-width'])
  })

  it('should trigger onClick function', () => {
    const onClick = jest.fn()
    const { container } = renderWithNexProvider(<Button onClick={onClick} />)
    fireEvent.click(container.firstElementChild!)
    expect(onClick).toHaveBeenCalled()
  })

  it('should ignore events when disabled', () => {
    const onClick = jest.fn()
    const { getByText } = renderWithNexProvider(
      <>
        <Button disabled onClick={onClick}>
          Btn Tag
        </Button>
        <Button disabled onClick={onClick} href="#">
          A Tag
        </Button>
      </>,
    )

    const button1 = getByText('Btn Tag')
    const button2 = getByText('A Tag')
    fireEvent.click(button1)
    fireEvent.click(button2)
    expect(button1).toHaveClass(buttonClasses.disabled)
    expect(button2).toHaveClass(buttonClasses.disabled)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('should support link button', () => {
    const { container } = renderWithNexProvider(
      <Button target="_blank" href="https://">
        Link Button
      </Button>,
    )
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should render with start icon', () => {
    const { getByTestId } = renderWithNexProvider(
      <Button startIcon={<span data-testid="start-icon">Icon</span>}>
        Button
      </Button>,
    )
    const startIcon = getByTestId('start-icon')
    expect(startIcon).toBeInTheDocument()
    expect(startIcon.parentElement).toHaveClass(buttonClasses.icon)
    expect(startIcon.parentElement).toHaveClass(buttonClasses['start-icon'])
  })

  it('should render with end icon', () => {
    const { getByTestId } = renderWithNexProvider(
      <Button endIcon={<span data-testid="end-icon">Icon</span>}>
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
          data-testid="button"
          onClick={() => setLoading(true)}
        >
          Button
        </Button>
      )
    }
    const { getByTestId } = renderWithNexProvider(<DefaultButton />)

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

    const { container } = renderWithNexProvider(
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
})
