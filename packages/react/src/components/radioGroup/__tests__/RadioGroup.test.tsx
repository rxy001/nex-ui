import { useState } from 'react'
import {
  renderWithNexUIProvider,
  testComponentStability,
  testRootClassName,
  testClassesForwarding,
  testSlotPropsForwarding,
  testRefForwarding,
} from '~/tests/shared'
import { act, fireEvent } from '@testing-library/react'
import { RadioGroup, Radio } from '../index'
import { radioGroupClasses, radioClasses } from '../classes'
import type { ElementType } from 'react'
import type { RadioGroupProps } from '../index'

const slots = ['label', 'wrapper'] as const

describe('RadioGroup', () => {
  function TestComponent(props: RadioGroupProps<string, ElementType>) {
    return (
      <RadioGroup {...props}>
        <Radio value='orange'>Orange</Radio>
        <Radio value='pear'>Pear</Radio>
        <Radio value='apple'>Apple</Radio>
      </RadioGroup>
    )
  }

  testComponentStability(<TestComponent />)

  testRootClassName(<TestComponent />)

  testClassesForwarding(
    <TestComponent label='Label' />,
    slots,
    {
      label: 'test-label',
      wrapper: 'test-wrapper',
    },
    radioGroupClasses,
  )

  testSlotPropsForwarding(
    <TestComponent label='Label' />,
    slots,
    {
      label: {
        className: 'test-label',
      },
      wrapper: {
        className: 'test-wrapper',
      },
    },
    radioGroupClasses,
  )

  testRefForwarding(<TestComponent />)

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<TestComponent />)
    const root = container.firstElementChild

    expect(root).toHaveClass(radioGroupClasses.root)
    expect(root).toHaveClass(radioGroupClasses['orientation-horizontal'])
    expect(root).not.toHaveClass(radioGroupClasses['orientation-vertical'])

    expect(root).toMatchSnapshot()
  })

  it('should render with orientation class based on orientation prop', () => {
    const { getByTestId } = renderWithNexUIProvider(
      <>
        <TestComponent orientation='vertical' data-testid='vertical' />
        <TestComponent orientation='horizontal' data-testid='horizontal' />
      </>,
    )

    expect(getByTestId('vertical')).toHaveClass(
      radioGroupClasses['orientation-vertical'],
    )
    expect(getByTestId('horizontal')).toHaveClass(
      radioGroupClasses['orientation-horizontal'],
    )
  })

  it('should switch different values when radios are clicked', () => {
    const { getAllByRole } = renderWithNexUIProvider(<TestComponent />)

    const [orangeRadio, pearRadio, appleRadio] = getAllByRole('radio')

    expect(orangeRadio).not.toBeChecked()
    expect(pearRadio).not.toBeChecked()
    expect(appleRadio).not.toBeChecked()

    fireEvent.click(orangeRadio)
    expect(orangeRadio).toBeChecked()

    fireEvent.click(pearRadio)
    expect(pearRadio).toBeChecked()

    fireEvent.click(appleRadio)
    expect(appleRadio).toBeChecked()
  })

  it('should be controlled by value prop', () => {
    function ControlledRadioGroup() {
      const [value, setValue] = useState('orange')

      return (
        <>
          <TestComponent value={value} onValueChange={setValue} />
          <div data-testid='current-value'>{value}</div>
        </>
      )
    }

    const { getAllByRole, getByTestId } = renderWithNexUIProvider(
      <ControlledRadioGroup />,
    )

    const [orangeRadio, pearRadio, appleRadio] = getAllByRole('radio')
    const currentValue = getByTestId('current-value')

    expect(orangeRadio).toBeChecked()
    expect(pearRadio).not.toBeChecked()
    expect(appleRadio).not.toBeChecked()
    expect(currentValue).toHaveTextContent('orange')

    fireEvent.click(pearRadio)
    expect(pearRadio).toBeChecked()
    expect(orangeRadio).not.toBeChecked()
    expect(appleRadio).not.toBeChecked()
    expect(currentValue).toHaveTextContent('pear')

    fireEvent.click(appleRadio)
    expect(appleRadio).toBeChecked()
    expect(orangeRadio).not.toBeChecked()
    expect(pearRadio).not.toBeChecked()
    expect(currentValue).toHaveTextContent('apple')
  })

  it('should support defaultValue prop', () => {
    const { getAllByRole } = renderWithNexUIProvider(
      <TestComponent defaultValue='apple' />,
    )

    const [orangeRadio, pearRadio, appleRadio] = getAllByRole('radio')

    expect(orangeRadio).not.toBeChecked()
    expect(pearRadio).not.toBeChecked()
    expect(appleRadio).toBeChecked()
  })

  it('should disable all radios when disabled prop is true', () => {
    const { getAllByRole } = renderWithNexUIProvider(<TestComponent disabled />)

    const radios = getAllByRole('radio')

    radios.forEach((radio) => {
      expect(radio).toBeDisabled()
    })
  })

  it('should apply color and size props to radios', () => {
    const { getAllByRole } = renderWithNexUIProvider(
      <TestComponent color='green' size='lg' />,
    )

    const radios = getAllByRole('radio')

    radios.forEach((radio) => {
      expect(radio.parentElement).toHaveClass(radioClasses['color-green'])
      expect(radio.parentElement).toHaveClass(radioClasses['size-lg'])
    })
  })

  it('should do nothing when a radio without a value is clicked', async () => {
    const { getAllByRole } = renderWithNexUIProvider(
      <RadioGroup>
        <Radio>Orange</Radio>
        <Radio value='pear'>Pear</Radio>
      </RadioGroup>,
    )

    const [firstRadio, secondRadio] = getAllByRole('radio')

    await act(async () => {
      fireEvent.click(firstRadio)
    })
    expect(firstRadio).not.toBeChecked()

    await act(async () => {
      fireEvent.click(secondRadio)
    })
    expect(secondRadio).toBeChecked()
  })

  it('should check non-input elements within RadioGroup when clicked', async () => {
    const { getByRole } = renderWithNexUIProvider(
      <RadioGroup>
        <Radio value='test' as='div'>
          Test Radio
        </Radio>
      </RadioGroup>,
    )
    const radio = getByRole('radio')
    const radioRoot = radio.parentElement!

    expect(radioRoot).not.toHaveClass(radioClasses.checked)
    expect(radio).not.toBeChecked()
    await act(async () => {
      fireEvent.click(radio)
    })
    expect(radioRoot).toHaveClass(radioClasses.checked)
    expect(radio).toBeChecked()
  })

  it('should not add duplicate radio states to the group', () => {
    // This test covers coverage for setGroupState
    function CustomRadio() {
      const [value, setValue] = useState('custom')

      return (
        <div>
          <Radio value={value}>Custom Radio</Radio>
          <button
            data-testid='change-value-button'
            onClick={() => setValue('changed')}
          >
            Change Value
          </button>
        </div>
      )
    }

    const { getByTestId, getByRole } = renderWithNexUIProvider(
      <RadioGroup>
        <CustomRadio />
      </RadioGroup>,
    )

    const button = getByTestId('change-value-button')
    const radio = getByRole('radio')

    fireEvent.click(button)
    expect(radio).toHaveAttribute('value', 'changed')
  })

  describe('Accessibility', () => {
    it('should have role="radiogroup" by default', () => {
      const { getByTestId } = renderWithNexUIProvider(
        <TestComponent data-testid='radiogroup' />,
      )
      expect(getByTestId('radiogroup')).toHaveAttribute('role', 'radiogroup')
    })

    it('should apply aria-labelledby to the root element when label is provided', () => {
      const { getByTestId, getByRole, rerender } = renderWithNexUIProvider(
        <TestComponent data-testid='radiogroup' />,
      )

      const radioGroup = getByTestId('radiogroup')
      expect(radioGroup).not.toHaveAttribute('aria-labelledby')

      rerender(<TestComponent data-testid='radiogroup' label='Label' />)

      const heading = getByRole('heading', { name: 'Label' })
      expect(radioGroup).toHaveAttribute('aria-labelledby', heading.id)
    })

    it('should move focus to the first radio when Tab is pressed and no radio is checked', async () => {
      const { getAllByRole, user } = renderWithNexUIProvider(<TestComponent />)

      const [firstRadio, secondRadio, thirdRadio] = getAllByRole('radio')

      await user.tab()
      expect(document.activeElement).toBe(firstRadio)

      expect(firstRadio).toHaveAttribute('tabindex', '0')
      expect(secondRadio).toHaveAttribute('tabindex', '-1')
      expect(thirdRadio).toHaveAttribute('tabindex', '-1')
    })

    it('should move focus to the checked radio when Tab is pressed and a radio is checked', async () => {
      const { getAllByRole, user } = renderWithNexUIProvider(
        <TestComponent value='apple' />,
      )

      const [firstRadio, secondRadio, thirdRadio] = getAllByRole('radio')

      await user.tab()
      expect(document.activeElement).toBe(thirdRadio)

      expect(firstRadio).toHaveAttribute('tabindex', '-1')
      expect(secondRadio).toHaveAttribute('tabindex', '-1')
      expect(thirdRadio).toHaveAttribute('tabindex', '0')
    })

    it('should move focus to the non-disabled radio when Tab is pressed', async () => {
      const { getAllByRole, user } = renderWithNexUIProvider(
        <RadioGroup>
          <Radio value='orange' disabled>
            Orange
          </Radio>
          <Radio value='pear'>Pear</Radio>
          <Radio value='apple'>Apple</Radio>
        </RadioGroup>,
      )
      const [, secondRadio] = getAllByRole('radio')

      await user.tab()
      expect(document.activeElement).toBe(secondRadio)
    })

    it('should move focus to the correct radio when Tab is pressed and multiple RadioGroups exist', async () => {
      const { user } = renderWithNexUIProvider(
        <>
          <TestComponent value='apple' />
          <TestComponent value='pear' />
          <TestComponent value='orange' />
        </>,
      )

      await user.tab()
      expect(document.activeElement).toHaveAttribute('value', 'apple')
      await user.tab()
      expect(document.activeElement).toHaveAttribute('value', 'pear')
      await user.tab()
      expect(document.activeElement).toHaveAttribute('value', 'orange')
    })

    it('should move focus to and check the next radio when ➡️ or ⬇️ is pressed', async () => {
      const { getAllByRole, user } = renderWithNexUIProvider(<TestComponent />)

      const [firstRadio, secondRadio, thirdRadio] = getAllByRole('radio')

      await user.tab()
      await user.keyboard('{ArrowDown}')
      expect(document.activeElement).toBe(secondRadio)
      expect(secondRadio).toBeChecked()

      await user.keyboard('{ArrowRight}')
      expect(document.activeElement).toBe(thirdRadio)
      expect(thirdRadio).toBeChecked()

      await user.keyboard('{ArrowDown}')
      expect(document.activeElement).toBe(firstRadio)
      expect(firstRadio).toBeChecked()
    })

    it('should move focus to and check the previous radio when ⬅️ or ⬆️ is pressed', async () => {
      const { getAllByRole, user } = renderWithNexUIProvider(<TestComponent />)

      const [firstRadio, secondRadio, thirdRadio] = getAllByRole('radio')

      await user.tab()
      await user.keyboard('{ArrowLeft}')
      expect(document.activeElement).toBe(thirdRadio)
      expect(thirdRadio).toBeChecked()

      await user.keyboard('{ArrowUp}')
      expect(document.activeElement).toBe(secondRadio)
      expect(secondRadio).toBeChecked()

      await user.keyboard('{ArrowLeft}')
      expect(document.activeElement).toBe(firstRadio)
      expect(firstRadio).toBeChecked()
    })

    it('should move focus to and check the non-disabled radio', async () => {
      const { getAllByRole, user, rerender } = renderWithNexUIProvider(
        <RadioGroup>
          <Radio value='orange'>Orange</Radio>
          <Radio value='pear' disabled>
            Pear
          </Radio>
          <Radio value='apple'>Apple</Radio>
        </RadioGroup>,
      )
      const [firstRadio, , thirdRadio] = getAllByRole('radio')

      await user.tab()
      expect(document.activeElement).toBe(firstRadio)
      await user.keyboard('{ArrowRight}')
      expect(document.activeElement).toBe(thirdRadio)
      expect(thirdRadio).toBeChecked()

      await user.keyboard('{ArrowLeft}')
      expect(document.activeElement).toBe(firstRadio)
      expect(firstRadio).toBeChecked()

      await user.keyboard('{ArrowDown}')
      expect(document.activeElement).toBe(thirdRadio)
      expect(thirdRadio).toBeChecked()

      await user.keyboard('{ArrowUp}')
      expect(document.activeElement).toBe(firstRadio)
      expect(firstRadio).toBeChecked()

      rerender(
        <RadioGroup>
          <Radio value='orange'>Orange</Radio>
          <Radio value='pear' disabled>
            Pear
          </Radio>
          <Radio value='apple' disabled>
            Apple
          </Radio>
        </RadioGroup>,
      )

      expect(document.activeElement).toBe(firstRadio)
      await user.keyboard('{ArrowUp}')
      expect(document.activeElement).toBe(firstRadio)
      await user.keyboard('{ArrowDown}')
      expect(document.activeElement).toBe(firstRadio)
      await user.keyboard('{ArrowLeft}')
      expect(document.activeElement).toBe(firstRadio)
      await user.keyboard('{ArrowRight}')
      expect(document.activeElement).toBe(firstRadio)
    })
  })
})
