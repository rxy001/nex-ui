import { useState } from 'react'
import { renderWithNexUIProvider } from '~/tests/shared'
import { Menu, MenuContent, MenuItem, MenuTrigger, MenuPortal } from '../index'

type TestMenuProps = {
  defaultOpen?: boolean
}

function TestMenu({ defaultOpen = false }: TestMenuProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Menu open={open} onOpenChange={setOpen}>
      <MenuTrigger>
        <button data-testid='trigger'>Open Menu</button>
      </MenuTrigger>
      <MenuPortal disablePresence>
        <MenuContent data-testid='menu-content'>
          <MenuItem data-testid='item-1'>Menu Item 1</MenuItem>
          <MenuItem data-testid='item-2'>Menu Item 2</MenuItem>
          <MenuItem data-testid='item-3'>Menu Item 3</MenuItem>
        </MenuContent>
      </MenuPortal>
    </Menu>
  )
}

describe('Menu', () => {
  it('should render menu content when open', async () => {
    const { getByText } = renderWithNexUIProvider(<TestMenu defaultOpen />)

    expect(getByText('Menu Item 1')).toBeInTheDocument()
    expect(getByText('Menu Item 2')).toBeInTheDocument()
    expect(getByText('Menu Item 3')).toBeInTheDocument()
  })

  describe('Accessibility', () => {
    it('should have role on menu content', () => {
      const { getByTestId } = renderWithNexUIProvider(<TestMenu defaultOpen />)

      expect(getByTestId('menu-content')).toHaveAttribute('role', 'menu')
    })

    it('should have ARIA attributes on menu content', () => {
      const { getByTestId } = renderWithNexUIProvider(<TestMenu defaultOpen />)

      const content = getByTestId('menu-content')
      const trigger = getByTestId('trigger')
      expect(content).toHaveAttribute('aria-orientation', 'vertical')
      expect(content).toHaveAttribute('aria-labelledby', trigger.id)
    })
  })
})
