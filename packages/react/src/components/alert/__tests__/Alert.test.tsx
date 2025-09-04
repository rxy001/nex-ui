import {
  renderWithNexUIProvider,
  testClassesForwarding,
  testColorClasses,
  testComponentStability,
  testRadiusClasses,
  testRefForwarding,
  testRootClassName,
  testSlotPropsForwarding,
  testVariantClasses,
} from '~/tests/shared'
import { Alert } from '../index'
import { alertClasses } from '../alertClasses'

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
  testColorClasses(<Alert />, alertClasses)
  testRadiusClasses(<Alert />, alertClasses)
  testVariantClasses(
    <Alert />,
    ['status', ['error', 'success', 'warning', 'info']],
    alertClasses,
  )
  testRefForwarding(<Alert />)
  testClassesForwarding(
    <Alert closable title='Title' description='Description' />,
    slots,
    {
      icon: 'test-icon',
      content: 'test-content',
      title: 'test-title',
      description: 'test-description',
      closeButton: 'test-close-button',
    },
    alertClasses,
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
    alertClasses,
  )

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<Alert />)

    const alertRoot = container.firstChild

    expect(alertRoot).toHaveClass(alertClasses.root)
    expect(alertRoot).toHaveClass(alertClasses['status-info'])
    expect(alertRoot).toHaveClass(alertClasses['radius-md'])
    expect(alertRoot).toHaveClass(alertClasses['color-blue'])
    expect(alertRoot).toHaveClass(alertClasses['variant-faded'])

    expect(alertRoot).not.toHaveClass(alertClasses['status-error'])
    expect(alertRoot).not.toHaveClass(alertClasses['status-success'])
    expect(alertRoot).not.toHaveClass(alertClasses['status-warning'])
    expect(alertRoot).not.toHaveClass(alertClasses['radius-none'])
    expect(alertRoot).not.toHaveClass(alertClasses['radius-sm'])
    expect(alertRoot).not.toHaveClass(alertClasses['radius-lg'])
    expect(alertRoot).not.toHaveClass(alertClasses['radius-full'])
    expect(alertRoot).not.toHaveClass(alertClasses['color-red'])
    expect(alertRoot).not.toHaveClass(alertClasses['color-orange'])
    expect(alertRoot).not.toHaveClass(alertClasses['color-yellow'])
    expect(alertRoot).not.toHaveClass(alertClasses['color-cyan'])
    expect(alertRoot).not.toHaveClass(alertClasses['color-pink'])
    expect(alertRoot).not.toHaveClass(alertClasses['color-purple'])
    expect(alertRoot).not.toHaveClass(alertClasses['color-green'])
    expect(alertRoot).not.toHaveClass(alertClasses['color-gray'])
    expect(alertRoot).not.toHaveClass(alertClasses['color-gray'])
    expect(alertRoot).not.toHaveClass(alertClasses['variant-outlined'])
    expect(alertRoot).not.toHaveClass(alertClasses['variant-solid'])
    expect(alertRoot).not.toHaveClass(alertClasses['variant-subtle'])

    expect(alertRoot).toMatchSnapshot()
  })

  it('should render close button when closable is true', () => {
    const { queryByClassName, rerender } = renderWithNexUIProvider(<Alert />)

    expect(
      queryByClassName(alertClasses['close-button']),
    ).not.toBeInTheDocument()

    rerender(<Alert closable />)

    expect(queryByClassName(alertClasses['close-button'])).toBeInTheDocument()
  })

  it('should hide icon when hideIcon is true', () => {
    const { queryByClassName, rerender } = renderWithNexUIProvider(<Alert />)

    expect(queryByClassName(alertClasses.icon)).toBeInTheDocument()

    rerender(<Alert hideIcon />)

    expect(queryByClassName(alertClasses.icon)).not.toBeInTheDocument()
  })

  it('should override status color when color is provided', () => {
    const { queryByClassName, rerender } = renderWithNexUIProvider(
      <Alert color='purple' status='info' />,
    )

    expect(queryByClassName(alertClasses.root)).toHaveClass(
      alertClasses['color-purple'],
    )

    rerender(<Alert color='green' status='success' />)

    expect(queryByClassName(alertClasses.root)).toHaveClass(
      alertClasses['color-green'],
    )
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

    expect(queryByClassName(alertClasses.description)).not.toBeInTheDocument()

    rerender(<Alert description='Description' />)

    expect(queryByClassName(alertClasses.description)).toBeInTheDocument()
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
    await user.click(queryByClassName(alertClasses['close-button'])!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  describe('Accessibility', () => {
    it('should have role alert on root element', () => {
      const { container } = renderWithNexUIProvider(<Alert />)

      expect(container.firstElementChild).toHaveAttribute('role', 'alert')
    })

    it('should have aria-label on close button', () => {
      const { queryByClassName } = renderWithNexUIProvider(<Alert closable />)

      expect(queryByClassName(alertClasses['close-button'])).toHaveAttribute(
        'aria-label',
        'Close alert',
      )
    })
  })
})
