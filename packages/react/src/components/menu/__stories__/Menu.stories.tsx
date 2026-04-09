import { useEffect, useRef, useState } from 'react'
import { CheckOutlined } from '@nex-ui/icons'
import {
  Menu,
  SubMenu as SubMenuImpl,
  MenuCheckboxItem,
  MenuCheckboxItemGroup,
  MenuContent,
  MenuItem,
  MenuPortal,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuTrigger,
  MenuTriggerItem,
  MenuItemIndicator,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuSeparator,
  SubMenuContent,
} from '../index'
import type { Meta } from '@storybook/react-vite'
import type { ReactNode } from 'react'

const style = {
  "&[data-highlighted='true']": {
    bg: 'wheat',
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
        <MenuContent>{children}</MenuContent>
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
        <MenuContent>
          <MenuItem sx={style}>Menu Item 1</MenuItem>
          <MenuItem sx={style}>Menu Item 2</MenuItem>
          <SubMenuImpl open={open2} onOpenChange={setOpen2}>
            <MenuTriggerItem sx={style}>Sub Menu</MenuTriggerItem>
            <MenuPortal>
              <SubMenuContent>
                <MenuItem sx={style}>Sub Menu Item 1</MenuItem>
                <MenuItem sx={style}>Sub Menu Item 2</MenuItem>
                <MenuItem sx={style}>Sub Menu Item 3</MenuItem>
              </SubMenuContent>
            </MenuPortal>
          </SubMenuImpl>
        </MenuContent>
      </MenuPortal>
    </Menu>
  )
}

export function GroupItems() {
  return (
    <MenuWrapper>
      <MenuItemGroup>
        <MenuItemGroupLabel>Group 1</MenuItemGroupLabel>
        <MenuItem sx={style}>Menu Item 1-1</MenuItem>
        <MenuItem sx={style} disabled>
          Menu Item 1-2
        </MenuItem>
        <MenuItem sx={style}>Menu Item 1-3</MenuItem>
      </MenuItemGroup>
      <MenuSeparator />
      <MenuItemGroup>
        <MenuItemGroupLabel>Group 2</MenuItemGroupLabel>
        <MenuItem sx={style}>Menu Item 2-1</MenuItem>
        <MenuItem sx={style}>Menu Item 2-2</MenuItem>
      </MenuItemGroup>
    </MenuWrapper>
  )
}

export function CheckboxItems() {
  const [value, setValue] = useState<string[]>([])

  return (
    <MenuWrapper>
      <MenuCheckboxItemGroup value={value} onValueChange={setValue}>
        <MenuItemGroupLabel>Checkbox Group</MenuItemGroupLabel>
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
        <MenuCheckboxItem sx={style} value='item-3' disabled>
          Checkbox Item 3
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuCheckboxItem>
        <MenuCheckboxItem sx={style} value='item-4'>
          Checkbox Item 4
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
        <MenuItemGroupLabel>Radio Group</MenuItemGroupLabel>
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
        <MenuRadioItem sx={style} value='item-3' disabled>
          Radio Item 3
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuRadioItem>
        <MenuRadioItem sx={style} value='item-4'>
          Radio Item 4
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuRadioItem>
      </MenuRadioItemGroup>
    </MenuWrapper>
  )
}

export function ViewportBoundary() {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    outerRef.current?.scrollTo(400, 400)
  }, [])

  return (
    <div
      style={{
        width: 400,
        height: 400,
        overflow: 'auto',
        border: '1px solid #000',
      }}
      ref={outerRef}
    >
      <div
        style={{
          height: 1200,
          width: 1200,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ref={innerRef}
      >
        <Menu open={open1} onOpenChange={setOpen1}>
          <MenuTrigger>
            <button>Open Menu</button>
          </MenuTrigger>
          <MenuPortal container={() => innerRef.current}>
            <MenuContent>
              <MenuItem sx={style}>Menu Item 1</MenuItem>
              <MenuItem sx={style}>Menu Item 2</MenuItem>
              <SubMenuImpl open={open2} onOpenChange={setOpen2}>
                <MenuTriggerItem sx={style}>Sub Menu</MenuTriggerItem>
                <MenuPortal container={() => innerRef.current}>
                  <SubMenuContent>
                    <MenuItem sx={style}>Sub Menu Item 1</MenuItem>
                    <MenuItem sx={style}>Sub Menu Item 2</MenuItem>
                    <MenuItem sx={style}>Sub Menu Item 3</MenuItem>
                  </SubMenuContent>
                </MenuPortal>
              </SubMenuImpl>
            </MenuContent>
          </MenuPortal>
        </Menu>
      </div>
    </div>
  )
}
