import { useState } from 'react'
import {
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
  testRefForwarding,
  testClassNamesForwarding,
  testSlotPropsForwarding,
  testVariantDataAttrs,
} from '~/tests/shared'
import { fireEvent } from '@testing-library/react'
import { Checkbox } from '../Checkbox'
import { CheckboxGroup } from '../CheckboxGroup'
import { checkboxGroupClasses } from './classes'

const children = [
  <Checkbox value='orange' key='orange'>
    orange
  </Checkbox>,
  <Checkbox value='pear' key='pear'>
    pear
  </Checkbox>,
  <Checkbox value='apple' key='apple'>
    Apple
  </Checkbox>,
]

const slots = ['label', 'wrapper'] as const

describe('CheckboxGroup', () => {
  testComponentStability(<CheckboxGroup>{children}</CheckboxGroup>, {
    useAct: true,
  })

  testRootClassName(<CheckboxGroup>{children}</CheckboxGroup>, {
    useAct: true,
  })

  testVariantDataAttrs(
    <CheckboxGroup>{children}</CheckboxGroup>,
    ['orientation', ['vertical', 'horizontal']],
    {
      useAct: true,
    },
  )

  testRefForwarding(<CheckboxGroup />, {
    useAct: true,
  })

  testClassNamesForwarding(
    <CheckboxGroup label='Label'>{children}</CheckboxGroup>,
    slots,
    {
      label: 'test-label',
      wrapper: 'test-wrapper',
    },
    checkboxGroupClasses,
    {
      useAct: true,
    },
  )

  testSlotPropsForwarding(
    <CheckboxGroup label='Label'>{children}</CheckboxGroup>,
    slots,
    {
      label: {
        className: 'test-label',
      },
      wrapper: {
        className: 'test-wrapper',
      },
    },
    checkboxGroupClasses,
    {
      useAct: true,
    },
  )

  it('should render with default props', async () => {
    const { container } = await renderWithNexUIProvider(
      <CheckboxGroup>{children}</CheckboxGroup>,
      {
        useAct: true,
      },
    )
    const root = container.firstElementChild

    expect(root).toHaveClass(checkboxGroupClasses.root)
    expect(root).toHaveAttribute('data-orientation', 'horizontal')

    expect(root).toMatchSnapshot()
  })

  it('should render with label', async () => {
    const { rerender, queryByClassName } = await renderWithNexUIProvider(
      <CheckboxGroup>{children}</CheckboxGroup>,
      {
        useAct: true,
      },
    )

    expect(queryByClassName(checkboxGroupClasses.label)).not.toBeInTheDocument()

    rerender(<CheckboxGroup label='Fruits'>{children}</CheckboxGroup>)

    const label = queryByClassName(checkboxGroupClasses.label)
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('Fruits')
  })

  it('should switch different values when checkboxes are clicked', async () => {
    const { getAllByRole } = await renderWithNexUIProvider(
      <CheckboxGroup>{children}</CheckboxGroup>,
      {
        useAct: true,
      },
    )

    const [orangeCheckbox, pearCheckbox, appleCheckbox] =
      getAllByRole('checkbox')

    expect(orangeCheckbox).not.toBeChecked()
    expect(pearCheckbox).not.toBeChecked()
    expect(appleCheckbox).not.toBeChecked()

    fireEvent.click(orangeCheckbox)
    expect(orangeCheckbox).toBeChecked()

    fireEvent.click(pearCheckbox)
    expect(pearCheckbox).toBeChecked()

    fireEvent.click(appleCheckbox)
    expect(appleCheckbox).toBeChecked()
  })

  it('should be controlled by value prop', async () => {
    function ControlledCheckboxGroup() {
      const [value, setValue] = useState(['orange'])

      return (
        <CheckboxGroup value={value} onValueChange={setValue}>
          {children}
        </CheckboxGroup>
      )
    }

    const { getAllByRole } = await renderWithNexUIProvider(
      <ControlledCheckboxGroup />,
      {
        useAct: true,
      },
    )

    const [orangeCheckbox, pearCheckbox, appleCheckbox] =
      getAllByRole('checkbox')

    expect(orangeCheckbox).toBeChecked()
    expect(pearCheckbox).not.toBeChecked()
    expect(appleCheckbox).not.toBeChecked()

    fireEvent.click(pearCheckbox)
    expect(pearCheckbox).toBeChecked()
    expect(orangeCheckbox).toBeChecked()
    expect(appleCheckbox).not.toBeChecked()

    fireEvent.click(appleCheckbox)
    expect(appleCheckbox).toBeChecked()
    expect(orangeCheckbox).toBeChecked()
    expect(pearCheckbox).toBeChecked()

    fireEvent.click(orangeCheckbox)
    expect(orangeCheckbox).not.toBeChecked()
    expect(pearCheckbox).toBeChecked()
    expect(appleCheckbox).toBeChecked()
  })

  it('should support defaultValue prop', async () => {
    const { getAllByRole } = await renderWithNexUIProvider(
      <CheckboxGroup defaultValue={['orange']}>{children}</CheckboxGroup>,
      {
        useAct: true,
      },
    )

    const [orangeCheckbox, pearCheckbox, appleCheckbox] =
      getAllByRole('checkbox')

    expect(orangeCheckbox).toBeChecked()
    expect(pearCheckbox).not.toBeChecked()
    expect(appleCheckbox).not.toBeChecked()

    fireEvent.click(pearCheckbox)
    expect(pearCheckbox).toBeChecked()
    expect(orangeCheckbox).toBeChecked()
    expect(appleCheckbox).not.toBeChecked()

    fireEvent.click(appleCheckbox)
    expect(appleCheckbox).toBeChecked()
    expect(orangeCheckbox).toBeChecked()
    expect(pearCheckbox).toBeChecked()

    fireEvent.click(orangeCheckbox)
    expect(orangeCheckbox).not.toBeChecked()
    expect(pearCheckbox).toBeChecked()
    expect(appleCheckbox).toBeChecked()
  })

  it('should disable all checkboxes when disabled prop is true', async () => {
    const onValueChange = jest.fn()
    const { getAllByRole } = await renderWithNexUIProvider(
      <CheckboxGroup disabled onValueChange={onValueChange}>
        {children}
      </CheckboxGroup>,
      {
        useAct: true,
      },
    )

    const checkboxes = getAllByRole('checkbox')

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeDisabled()
    })

    fireEvent.click(checkboxes[0])
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('should apply color, size, and radius props to checkboxes', async () => {
    const { getAllByRole } = await renderWithNexUIProvider(
      <CheckboxGroup color='green' size='lg' radius='lg'>
        {children}
      </CheckboxGroup>,
      {
        useAct: true,
      },
    )

    const checkboxes = getAllByRole('checkbox')

    checkboxes.forEach((checkbox) => {
      expect(checkbox.parentElement).toHaveAttribute('data-color', 'green')
      expect(checkbox.parentElement).toHaveAttribute('data-size', 'lg')
      expect(checkbox.parentElement).toHaveAttribute('data-radius', 'lg')
    })
  })

  it('should apply name prop to all checkboxes', async () => {
    const { getAllByRole } = await renderWithNexUIProvider(
      <CheckboxGroup name='fruits'>{children}</CheckboxGroup>,
      {
        useAct: true,
      },
    )

    const checkboxes = getAllByRole('checkbox')

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveAttribute('name', 'fruits')
    })
  })

  describe('Accessibility', () => {
    it('should have role="group" by default', async () => {
      const { getByTestId } = await renderWithNexUIProvider(
        <CheckboxGroup data-testid='group'>{children}</CheckboxGroup>,
        {
          useAct: true,
        },
      )
      expect(getByTestId('group')).toHaveAttribute('role', 'group')
    })

    it('should apply aria-labelledby to the root element when label is provided', async () => {
      const { getByTestId, getByRole, rerender } =
        await renderWithNexUIProvider(
          <CheckboxGroup data-testid='group'>{children}</CheckboxGroup>,
          {
            useAct: true,
          },
        )

      const group = getByTestId('group')
      expect(group).not.toHaveAttribute('aria-labelledby')

      rerender(
        <CheckboxGroup data-testid='group' label='Label'>
          {children}
        </CheckboxGroup>,
      )

      const heading = getByRole('heading', { name: 'Label' })
      expect(group).toHaveAttribute('aria-labelledby', heading.id)
    })
  })
})
