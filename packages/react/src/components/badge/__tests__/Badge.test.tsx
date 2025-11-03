import {
  testClassNamesForwarding,
  testColorDataAttrs,
  testComponentStability,
  testRefForwarding,
  testRootClassName,
  testSlotPropsForwarding,
  testVariantDataAttrs,
  renderWithNexUIProvider,
} from '~/tests/shared'
import { Badge } from '../index'
import { badgeSlotClasses } from './classes'

const slots = ['closeButton'] as const

describe('Badge', () => {
  testComponentStability(<Badge />)

  testRootClassName(<Badge />)

  testRefForwarding(<Badge />)

  testColorDataAttrs(<Badge />)

  testVariantDataAttrs(<Badge />, ['size', ['sm', 'md', 'lg', 'xl']])

  testVariantDataAttrs(<Badge />, [
    'radius',
    ['none', 'sm', 'md', 'lg', 'xl', 'full'],
  ])

  testClassNamesForwarding(
    <Badge closable />,
    slots,
    {
      closeButton: 'test-close-button',
    },
    badgeSlotClasses,
  )

  testSlotPropsForwarding(
    <Badge closable />,
    slots,
    {
      closeButton: { className: 'test-close-button' },
    },
    badgeSlotClasses,
  )

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Badge>Badge</Badge>)
    const badgeRoot = container.firstElementChild
    expect(badgeRoot).toHaveClass(badgeSlotClasses.root)
    expect(badgeRoot).toHaveAttribute('data-size', 'md')
    expect(badgeRoot).toHaveAttribute('data-radius', 'md')
    expect(badgeRoot).toHaveAttribute('data-variant', 'solid')
    expect(badgeRoot).toHaveAttribute('data-color', 'blue')
    expect(badgeRoot).toHaveAttribute('data-closable', 'false')
    expect(badgeRoot).toHaveAttribute('data-disabled', 'false')

    expect(badgeRoot).toMatchSnapshot()
  })

  it('should render close button when closable is true', async () => {
    const handleClose = jest.fn()

    const { getByLabelText, user } = renderWithNexUIProvider(
      <Badge closable onClose={handleClose}>
        Badge
      </Badge>,
    )
    const closeButton = getByLabelText('Close Badge')
    expect(closeButton).toBeInTheDocument()

    await user.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should disable badge when disabled is true', () => {
    const { container } = renderWithNexUIProvider(<Badge disabled>Badge</Badge>)
    const badgeRoot = container.firstElementChild
    expect(badgeRoot).toHaveAttribute('data-disabled', 'true')

    expect(badgeRoot).toHaveStyleRule('pointer-events', 'none')
  })

  it('should display startIcon and endIcon correctly', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <Badge
        startIcon={<span data-testid='start-icon'>S</span>}
        endIcon={<span data-testid='end-icon'>E</span>}
      >
        Badge
      </Badge>,
    )

    const startIcon = getByTestId('start-icon')
    const endIcon = getByTestId('end-icon')

    expect(startIcon).toBeInTheDocument()
    expect(endIcon).toBeInTheDocument()
  })
})
