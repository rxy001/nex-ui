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
import type { ReactNode } from 'react'

const itemStyle = {
  '&[data-highlighted="true"]': {
    bg: 'wheat',
  },
  '&[data-disabled="true"]': {
    opacity: 0.4,
  },
}

const contentStyle = {
  minW: '120px',
  border: '1px solid black',
  p: '2',
}

function MenuWrapper({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Menu open={open} onOpenChange={setOpen}>
      <MenuTrigger>
        <button>Open Menu</button>
      </MenuTrigger>
      <MenuPortal>
        <MenuContent sx={contentStyle}>{children}</MenuContent>
      </MenuPortal>
    </Menu>
  )
}

const meta = {
  title: 'Utilities/Menu',
  parameters: {
    controls: {
      disable: true,
    },
  },
  tags: ['nui-utility'],
}

export default meta

export function Default() {
  return (
    <MenuWrapper>
      <MenuItem disabled sx={itemStyle}>
        Undo
      </MenuItem>
      <MenuItem sx={itemStyle}>Redo</MenuItem>
      <MenuItem sx={itemStyle} disabled>
        Cut
      </MenuItem>
      <MenuItem sx={itemStyle}>Copy</MenuItem>
      <MenuItem sx={itemStyle}>Paste</MenuItem>
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
          <MenuItem sx={itemStyle}>Menu Item 1</MenuItem>
          <MenuItem sx={itemStyle}>Menu Item 2</MenuItem>
          <SubMenuImpl open={open2} onOpenChange={setOpen2}>
            <MenuTriggerItem sx={itemStyle}>Sub Menu</MenuTriggerItem>
            <MenuPortal>
              <SubMenuContent>
                <MenuItem sx={itemStyle}>Sub Menu Item 1</MenuItem>
                <MenuItem sx={itemStyle}>Sub Menu Item 2</MenuItem>
                <MenuItem sx={itemStyle}>Sub Menu Item 3</MenuItem>
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
        <MenuItem sx={itemStyle}>Menu Item 1-1</MenuItem>
        <MenuItem sx={itemStyle} disabled>
          Menu Item 1-2
        </MenuItem>
        <MenuItem sx={itemStyle}>Menu Item 1-3</MenuItem>
      </MenuItemGroup>
      <MenuSeparator />
      <MenuItemGroup>
        <MenuItemGroupLabel>Group 2</MenuItemGroupLabel>
        <MenuItem sx={itemStyle}>Menu Item 2-1</MenuItem>
        <MenuItem sx={itemStyle}>Menu Item 2-2</MenuItem>
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
        <MenuCheckboxItem sx={itemStyle} value='item-1'>
          Checkbox Item 1
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuCheckboxItem>
        <MenuCheckboxItem sx={itemStyle} value='item-2'>
          Checkbox Item 2
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuCheckboxItem>
        <MenuCheckboxItem sx={itemStyle} value='item-3' disabled>
          Checkbox Item 3
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuCheckboxItem>
        <MenuCheckboxItem sx={itemStyle} value='item-4'>
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
        <MenuRadioItem sx={itemStyle} value='item-1'>
          Radio Item 1
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuRadioItem>
        <MenuRadioItem sx={itemStyle} value='item-2'>
          Radio Item 2
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuRadioItem>
        <MenuRadioItem sx={itemStyle} value='item-3' disabled>
          Radio Item 3
          <MenuItemIndicator>
            <CheckOutlined />
          </MenuItemIndicator>
        </MenuRadioItem>
        <MenuRadioItem sx={itemStyle} value='item-4'>
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
              <MenuItem sx={itemStyle}>Menu Item 1</MenuItem>
              <MenuItem sx={itemStyle}>Menu Item 2</MenuItem>
              <SubMenuImpl open={open2} onOpenChange={setOpen2}>
                <MenuTriggerItem sx={itemStyle}>Sub Menu</MenuTriggerItem>
                <MenuPortal container={() => innerRef.current}>
                  <SubMenuContent>
                    <MenuItem sx={itemStyle}>Sub Menu Item 1</MenuItem>
                    <MenuItem sx={itemStyle}>Sub Menu Item 2</MenuItem>
                    <MenuItem sx={itemStyle}>Sub Menu Item 3</MenuItem>
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
