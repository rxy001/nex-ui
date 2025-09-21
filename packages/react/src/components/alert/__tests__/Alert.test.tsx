import {
  renderWithNexUIProvider,
  testClassNamesForwarding,
  testColorDataAttrs,
  testComponentStability,
  testRadiusDataAttrs,
  testRefForwarding,
  testRootClassName,
  testSlotPropsForwarding,
  testVariantDataAttrs,
} from '~/tests/shared'
import { Alert } from '../index'
import { alertSlotClasses, alertDataAttrs } from './constants'

const slots = [
  'icon',
  'content',
  'title',
  'description',
  'closeButton',
] as const

describe('Alert', () => {
  testComponentStability(<Alert />)

  testRootClassName(<Alert />)

  testColorDataAttrs(<Alert />)

  testRadiusDataAttrs(<Alert />)

  testVariantDataAttrs(<Alert />, [
    'status',
    ['error', 'success', 'warning', 'info'],
  ])

  testRefForwarding(<Alert />)

  testClassNamesForwarding(
    <Alert closable title='Title' description='Description' />,
    slots,
    {
      icon: 'test-icon',
      content: 'test-content',
      title: 'test-title',
      description: 'test-description',
      closeButton: 'test-close-button',
    },
    alertSlotClasses,
  )

  testSlotPropsForwarding(
    <Alert title='Title' description='Description' closable />,
    slots,
    {
      icon: {
        className: 'test-icon',
      },
      content: {
        className: 'test-content',
      },
      title: {
        className: 'test-title',
      },
      description: {
        className: 'test-description',
      },
      closeButton: {
        className: 'test-close-button',
      },
    },
    alertSlotClasses,
  )

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Alert />)

    const alertRoot = container.firstChild

    expect(alertRoot).toHaveClass(alertSlotClasses.root)

    expect(alertRoot).toHaveAttribute(...alertDataAttrs['status-info'])
    expect(alertRoot).toHaveAttribute(...alertDataAttrs['variant-faded'])
    expect(alertRoot).toHaveAttribute(...alertDataAttrs['radius-md'])
    expect(alertRoot).toHaveAttribute(...alertDataAttrs['color-blue'])

    expect(alertRoot).toMatchSnapshot()
  })

  it('should render close button when closable is true', () => {
    const { queryByClassName, rerender } = renderWithNexUIProvider(<Alert />)

    expect(
      queryByClassName(alertSlotClasses['close-button']),
    ).not.toBeInTheDocument()

    rerender(<Alert closable />)

    expect(
      queryByClassName(alertSlotClasses['close-button']),
    ).toBeInTheDocument()
  })

  it('should hide icon when hideIcon is true', () => {
    const { queryByClassName, rerender } = renderWithNexUIProvider(<Alert />)

    expect(queryByClassName(alertSlotClasses.icon)).toBeInTheDocument()

    rerender(<Alert hideIcon />)

    expect(queryByClassName(alertSlotClasses.icon)).not.toBeInTheDocument()
  })

  it('should override status color when color is provided', () => {
    const { queryByClassName, rerender } = renderWithNexUIProvider(
      <Alert color='purple' status='info' />,
    )

    const alertRoot = queryByClassName(alertSlotClasses.root)

    expect(alertRoot).toHaveAttribute(...alertDataAttrs['color-purple'])

    rerender(<Alert color='green' status='success' />)

    expect(alertRoot).toHaveAttribute(...alertDataAttrs['color-green'])
  })

  it('should custom icon', () => {
    const { queryByTestId } = renderWithNexUIProvider(
      <Alert icon={<span data-testid='custom-icon' />} />,
    )

    expect(queryByTestId('custom-icon')).toBeInTheDocument()
  })

  it('should custom action', () => {
    const { queryByTestId } = renderWithNexUIProvider(
      <Alert action={<span data-testid='custom-action' />} />,
    )

    expect(queryByTestId('custom-action')).toBeInTheDocument()
  })

  it('should render description slot when description is provided', () => {
    const { queryByClassName, rerender } = renderWithNexUIProvider(<Alert />)

    expect(
      queryByClassName(alertSlotClasses.description),
    ).not.toBeInTheDocument()

    rerender(<Alert description='Description' />)

    expect(queryByClassName(alertSlotClasses.description)).toBeInTheDocument()
  })

  it('should error when status is invalid', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    // @ts-expect-error
    renderWithNexUIProvider(<Alert status='unknown' />)

    expect(consoleSpy).toHaveBeenCalledWith(
      '[Nex UI] Alert: Unknown status %s',
      'unknown',
    )

    consoleSpy.mockRestore()
  })

  it('should call onClose when close button is clicked', async () => {
    const onClose = jest.fn()
    const { queryByClassName, user } = renderWithNexUIProvider(
      <Alert closable onClose={onClose} />,
    )
    await user.click(queryByClassName(alertSlotClasses['close-button'])!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  describe('Accessibility', () => {
    it('should have role alert on root element', () => {
      const { container } = renderWithNexUIProvider(<Alert />)

      expect(container.firstElementChild).toHaveAttribute('role', 'alert')
    })

    it('should have aria-label on close button', () => {
      const { queryByClassName } = renderWithNexUIProvider(<Alert closable />)

      expect(
        queryByClassName(alertSlotClasses['close-button']),
      ).toHaveAttribute('aria-label', 'Close alert')
    })
  })
})
