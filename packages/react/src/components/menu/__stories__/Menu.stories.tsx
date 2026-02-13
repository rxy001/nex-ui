import { useState } from 'react'
import { CheckOutlined } from '@nex-ui/icons'
import {
  Menu,
  MenuCheckboxItem,
  MenuCheckboxItemGroup,
  MenuContent,
  MenuItem,
  MenuMotion,
  MenuPortal,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuTrigger,
  MenuTriggerItem,
  MenuItemIndicator,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuSeparator,
} from '../index'
import type { Meta } from '@storybook/react-vite'
import type { ReactNode } from 'react'

const style = {
  "&[data-highlighted='true']": {
    background: 'wheat',
  },
}

function MenuWrapper({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Menu open={open} onOpenChange={setOpen}>
      <MenuTrigger>
        <button>Open Menu</button>
      </MenuTrigger>
      <MenuPortal>
        <MenuMotion>
          <MenuContent>{children}</MenuContent>
        </MenuMotion>
      </MenuPortal>
    </Menu>
  )
}

const meta: Meta = {
  title: 'Utilities/Menu',
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export default meta

export function Default() {
  return (
    <MenuWrapper>
      <MenuItem sx={style}>Menu Item 1</MenuItem>
      <MenuItem sx={style}>Menu Item 2</MenuItem>
      <MenuItem sx={style}>Menu Item 3</MenuItem>
    </MenuWrapper>
  )
}

export function SubMenu() {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)

  return (
    <Menu open={open1} onOpenChange={setOpen1}>
      <MenuTrigger>
        <button>Open Menu</button>
      </MenuTrigger>
      <MenuPortal>
        <MenuMotion>
          <MenuContent>
            <MenuItem sx={style}>Menu Item 1</MenuItem>
            <MenuItem sx={style}>Menu Item 2</MenuItem>
            <Menu open={open2} onOpenChange={setOpen2}>
              <MenuTriggerItem sx={style}>Sub Menu</MenuTriggerItem>
              <MenuPortal>
                <MenuMotion>
                  <MenuContent>
                    <MenuItem sx={style}>Sub Menu Item 1</MenuItem>
                    <MenuItem sx={style}>Sub Menu Item 2</MenuItem>
                    <MenuItem sx={style}>Sub Menu Item 3</MenuItem>
                  </MenuContent>
                </MenuMotion>
              </MenuPortal>
            </Menu>
          </MenuContent>
        </MenuMotion>
      </MenuPortal>
    </Menu>
  )
}

export function GroupItems() {
  return (
    <MenuWrapper>
      <MenuItemGroup>
        <MenuItemGroupLabel>Group 1</MenuItemGroupLabel>
        <MenuItem sx={style}>Menu Item 1</MenuItem>
        <MenuItem sx={style}>Menu Item 2</MenuItem>
      </MenuItemGroup>
      <MenuSeparator />
      <MenuItemGroup>
        <MenuItemGroupLabel>Group 2</MenuItemGroupLabel>
        <MenuItem sx={style}>Menu Item 3</MenuItem>
        <MenuItem sx={style}>Menu Item 4</MenuItem>
      </MenuItemGroup>
    </MenuWrapper>
  )
}

export function CheckboxItems() {
  const [value, setValue] = useState<string[]>([])

  return (
    <MenuWrapper>
      <MenuCheckboxItemGroup value={value} onValueChange={setValue}>
        <MenuCheckboxItem sx={style} value='item-1'>
          Checkbox Item 1
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuCheckboxItem>
        <MenuCheckboxItem sx={style} value='item-2'>
          Checkbox Item 2
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuCheckboxItem>
        <MenuCheckboxItem sx={style} value='item-3'>
          Checkbox Item 3
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuCheckboxItem>
      </MenuCheckboxItemGroup>
    </MenuWrapper>
  )
}

export function RadioItems() {
  const [value, setValue] = useState<string>('')

  return (
    <MenuWrapper>
      <MenuRadioItemGroup value={value} onValueChange={setValue}>
        <MenuRadioItem sx={style} value='item-1'>
          Radio Item 1
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuRadioItem>
        <MenuRadioItem sx={style} value='item-2'>
          Radio Item 2
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuRadioItem>
        <MenuRadioItem sx={style} value='item-3'>
          Radio Item 3
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuRadioItem>
      </MenuRadioItemGroup>
    </MenuWrapper>
  )
}

export function DisableAnimation() {
  const [open, setOpen] = useState(false)

  return (
    <Menu open={open} onOpenChange={setOpen}>
      <MenuTrigger>
        <button>Open Menu</button>
      </MenuTrigger>
      <MenuPortal disablePresence>
        <MenuContent>
          <MenuItem sx={style}>Menu Item 1</MenuItem>
          <MenuItem sx={style}>Menu Item 2</MenuItem>
          <MenuItem sx={style}>Menu Item 3</MenuItem>
        </MenuContent>
      </MenuPortal>
    </Menu>
  )
}
