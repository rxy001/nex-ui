import { describe, it, expect, jest } from '@jest/globals'
import { mountTest, refTest } from '@/tests/shared'
import { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Button } from '../Button'
import type { ButtonProps } from '../types'

describe('Button', () => {
  mountTest(Button)
  refTest(Button)

  it('renders correctly', () => {
    const { container } = render(<Button>Button</Button>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should trigger onClick function', () => {
    const onClick = jest.fn()
    const { container } = render(<Button onClick={onClick} />)
    fireEvent.click(container.firstChild!)
    expect(onClick).toHaveBeenCalled()
  })

  it('should ignore events when disabled', () => {
    const onClick = jest.fn()
    const { getByText } = render(
      <>
        <Button disabled onClick={onClick}>
          Btn Tag
        </Button>
        <Button disabled onClick={onClick} href="#">
          A Tag
        </Button>
      </>,
    )
    fireEvent.click(getByText('Btn Tag'))
    fireEvent.click(getByText('A Tag'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('should support link button', () => {
    const { container } = render(
      <Button target="_blank" href="https://">
        Link Button
      </Button>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should renders with start icon', () => {
    const { getByTestId } = render(
      <Button startIcon={<span data-testid="start-icon">Icon</span>}>
        Button
      </Button>,
    )
    expect(getByTestId('start-icon')).toBeInTheDocument()
  })

  it('should renders with end icon', () => {
    const { getByTestId } = render(
      <Button startIcon={<span data-testid="end-icon">Icon</span>}>
        Button
      </Button>,
    )
    expect(getByTestId('end-icon')).toBeInTheDocument()
  })

  it('should support to change loading', () => {
    const DefaultButton: React.FC = () => {
      const [loading, setLoading] = useState<ButtonProps['loading']>(false)
      return (
        <Button loading={loading} onClick={() => setLoading(true)}>
          Button
        </Button>
      )
    }
    const { container } = render(<DefaultButton />)
    fireEvent.click(container.firstChild!)
    expect(container.querySelector('.nexui-start-icon')).toBeInTheDocument()
  })
})
