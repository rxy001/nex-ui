import { createRef, useState } from 'react'
import {
  testComponentStability,
  renderWithNexUIProvider,
  testRootClassName,
} from '~/tests/shared'
import { fireEvent } from '@testing-library/react'
import { Checkbox } from '../Checkbox'
import { CheckboxGroup } from '../CheckboxGroup'
import { checkboxClasses, checkboxGroupClasses } from '../checkboxClasses'

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

describe('CheckboxGroup', () => {
  testComponentStability(<CheckboxGroup>{children}</CheckboxGroup>, {
    useAct: true,
  })

  testRootClassName(
    <CheckboxGroup className='test-class'>{children}</CheckboxGroup>,
    'test-class',
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
    expect(root).toHaveClass(checkboxGroupClasses.horizontal)
    expect(root).not.toHaveClass(checkboxGroupClasses.vertical)

    expect(root).toMatchSnapshot()
  })

  it("should forward ref to CheckboxGroup's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <CheckboxGroup ref={ref} data-testid='checkbox-group'>
        {children}
      </CheckboxGroup>,
      {
        useAct: true,
      },
    )
    expect(getByTestId('checkbox-group')).toBe(ref.current)
  })

  it('should render with orientation class based on orientation prop', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <>
        <CheckboxGroup orientation='vertical' data-testid='vertical'>
          {children}
        </CheckboxGroup>
        <CheckboxGroup orientation='horizontal' data-testid='horizontal'>
          {children}
        </CheckboxGroup>
      </>,
      {
        useAct: true,
      },
    )

    expect(getByTestId('vertical')).toHaveClass(checkboxGroupClasses.vertical)
    expect(getByTestId('horizontal')).toHaveClass(
      checkboxGroupClasses.horizontal,
    )
  })

  it('should switch different values when checkboxes are clicked', async () => {
    const { getAllByRole } = await renderWithNexUIProvider(
      <CheckboxGroup>{children}</CheckboxGroup>,
      {
        useAct: true,
      },
    )

    const checkboxes = getAllByRole('checkbox')

    const orangeCheckbox = checkboxes[0]
    const pearCheckbox = checkboxes[1]
    const appleCheckbox = checkboxes[2]

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

    const checkboxes = getAllByRole('checkbox')
    const orangeCheckbox = checkboxes[0]
    const pearCheckbox = checkboxes[1]
    const appleCheckbox = checkboxes[2]

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

    const checkboxes = getAllByRole('checkbox')
    const orangeCheckbox = checkboxes[0]
    const pearCheckbox = checkboxes[1]
    const appleCheckbox = checkboxes[2]

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
      expect(checkbox.parentElement).toHaveClass(checkboxClasses['color-green'])
      expect(checkbox.parentElement).toHaveClass(checkboxClasses['size-lg'])
      expect(checkbox.parentElement).toHaveClass(checkboxClasses['radius-lg'])
    })
  })
})
