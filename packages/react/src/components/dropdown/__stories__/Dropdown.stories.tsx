import { useState } from 'react'
import {
  UserOutlined,
  HeartOutlined,
  CodeSquareOutlined,
  SettingsOutlined,
  StarOutlined,
  ShareOutlined,
  ChevronRightOutlined,
} from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import { COLORS, SIZES, WithLabel } from '~/sb/utils'
import { Button } from '../../button'
import { Flex } from '../../flex'
import { Box } from '../../box'
import { Avatar } from '../../avatar'
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  DropdownItem,
  DropdownItemGroup,
  DropdownItemGroupLabel,
  DropdownCheckboxItem,
  DropdownCheckboxItemGroup,
  DropdownRadioItem,
  DropdownRadioItemGroup,
  SubDropdown,
  DropdownTriggerItem,
  SubDropdownContent,
  DropdownDivider,
} from '../index'
import type { DropdownContentProps } from '../index'
import type { Meta, StoryObj } from '@storybook/react-vite'

type DropdownTemplateProps = DropdownContentProps & {
  triggerText?: string
}

function DropdownTemplate({
  triggerText = 'Open Dropdown',
  ...props
}: DropdownTemplateProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {triggerText}
        </Button>
      </DropdownTrigger>
      <DropdownContent {...props}>
        <DropdownItem>Item 1</DropdownItem>
        <DropdownItem>Item 2</DropdownItem>
        <DropdownItem>Item 3</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}

const PLACEMENTS = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
] as const

const VARIANTS = ['solid', 'outlined', 'ghost', 'faded'] as const

const meta = {
  title: 'Components/Dropdown',
  component: DropdownTemplate,
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    disableAnimation: {
      control: 'boolean',
    },
    keepMounted: {
      control: 'boolean',
    },
    placement: {
      control: 'select',
      options: PLACEMENTS,
    },
    loopFocus: {
      control: 'boolean',
    },
    closeOnDetached: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    restoreFocus: {
      control: 'boolean',
    },
    radius: {
      options: ['none', 'sm', 'md', 'lg'],
      control: 'select',
    },
    size: {
      options: SIZES,
      control: 'select',
    },
  },
} satisfies Meta<typeof DropdownTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SubMenu: Story = {
  render: (props) => {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button>Open Dropdown</Button>
        </DropdownTrigger>
        <DropdownContent {...props}>
          <DropdownItem>Item 1</DropdownItem>
          <SubDropdown>
            <DropdownTriggerItem>SubMenu</DropdownTriggerItem>
            <SubDropdownContent>
              <DropdownItem>Sub Item 1</DropdownItem>
              <DropdownItem>Sub Item 2</DropdownItem>
            </SubDropdownContent>
          </SubDropdown>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownContent>
      </Dropdown>
    )
  },
}

export const Colors: Story = {
  render: (props: DropdownContentProps) => (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <WithLabel key={color} label={`${upperFirst(color)}Color`}>
          <DropdownTemplate {...props} color={color} />
        </WithLabel>
      ))}
    </Flex>
  ),
  argTypes: {
    color: {
      control: false,
    },
  },
}

export const Variants: Story = {
  render: (props: DropdownContentProps) => (
    <Flex gap='5' wrap='wrap'>
      {VARIANTS.map((variant) => (
        <WithLabel key={variant} label={`${upperFirst(variant)}Variant`}>
          <DropdownTemplate color='blue' {...props} variant={variant} />
        </WithLabel>
      ))}
    </Flex>
  ),
  argTypes: {
    variant: {
      control: false,
    },
  },
}

export const Placements: Story = {
  render: (props: DropdownContentProps) => (
    <Flex
      sx={{
        w: '100%',
        h: '100%',
      }}
      justify='center'
      align='center'
      wrap='wrap'
    >
      <Box
        sx={{
          display: 'grid',
          gap: '5',
          gridTemplateColumns: 'repeat(3, max-content)',
        }}
      >
        {PLACEMENTS.map((placement) => (
          <DropdownTemplate
            key={placement}
            {...props}
            placement={placement}
            triggerText={placement}
          />
        ))}
      </Box>
    </Flex>
  ),
  argTypes: {
    placement: {
      control: false,
    },
  },
}

export function WithGroups(props: DropdownContentProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent {...props}>
        <DropdownItemGroup>
          <DropdownItemGroupLabel>Fruits</DropdownItemGroupLabel>
          <DropdownItem>Apple</DropdownItem>
          <DropdownItem>Banana</DropdownItem>
          <DropdownItem>Orange</DropdownItem>
          <DropdownItem>Grapes</DropdownItem>
        </DropdownItemGroup>
        <DropdownDivider />
        <DropdownItemGroup>
          <DropdownItemGroupLabel>Vegetables</DropdownItemGroupLabel>
          <DropdownItem>Carrot</DropdownItem>
          <DropdownItem>Broccoli</DropdownItem>
        </DropdownItemGroup>
      </DropdownContent>
    </Dropdown>
  )
}

export function WithIcons(props: DropdownContentProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent {...props}>
        <DropdownItem startIcon={<UserOutlined />} shortcut='⌘P'>
          Profile
        </DropdownItem>
        <DropdownItem startIcon={<SettingsOutlined />} shortcut='⌘S'>
          Settings
        </DropdownItem>
        <DropdownItem startIcon={<StarOutlined />} shortcut='⌘T'>
          Stars
        </DropdownItem>
        <DropdownItem
          startIcon={<ShareOutlined />}
          endIcon={<ChevronRightOutlined />}
        >
          Share
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}

export function RadioItems(props: DropdownContentProps) {
  const [selectedRadio, setSelectedRadio] = useState<string>('1')

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent {...props}>
        <DropdownRadioItemGroup
          value={selectedRadio}
          onValueChange={setSelectedRadio}
        >
          <DropdownItemGroupLabel>Pages</DropdownItemGroupLabel>
          <DropdownRadioItem value='1'>index.ts</DropdownRadioItem>
          <DropdownRadioItem value='2'>README.md</DropdownRadioItem>
          <DropdownRadioItem value='3' disabled>
            package-lock.json
          </DropdownRadioItem>
          <DropdownRadioItem value='4'>package.json</DropdownRadioItem>
        </DropdownRadioItemGroup>
      </DropdownContent>
    </Dropdown>
  )
}

export function CheckboxItems(props: DropdownContentProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>(['1', '3'])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent {...props}>
        <DropdownCheckboxItemGroup
          value={checkedItems}
          onValueChange={setCheckedItems}
        >
          <DropdownItemGroupLabel>Features</DropdownItemGroupLabel>
          <DropdownCheckboxItem value='1'>Autosave</DropdownCheckboxItem>
          <DropdownCheckboxItem value='2'>Detect Language</DropdownCheckboxItem>
          <DropdownCheckboxItem value='3'>Spellcheck</DropdownCheckboxItem>
        </DropdownCheckboxItemGroup>
      </DropdownContent>
    </Dropdown>
  )
}

export function LinkItems(props: DropdownContentProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent {...props}>
        <DropdownItem
          as='a'
          href='https://www.google.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Google
        </DropdownItem>
        <DropdownItem
          as='a'
          href='https://www.facebook.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Facebook
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}

export function PreventClosing(props: DropdownContentProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent {...props}>
        <DropdownItem
          closeOnSelect={false}
          onClick={() => {
            alert('action')
          }}
        >
          Item 1 (stay open)
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            alert('action')
          }}
        >
          Item 2 (will close)
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}

export function Shortcut(props: DropdownContentProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent {...props}>
        <DropdownItem shortcut='⌘N'>New File</DropdownItem>
        <DropdownItem shortcut='⌘W'>New Window</DropdownItem>
        <DropdownItem shortcut='⌘O'>Open File</DropdownItem>
        <DropdownItem shortcut='⌘S'>Export</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}

export function CustomTrigger(props: DropdownContentProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          radius='full'
          src='https://avatars.githubusercontent.com/u/25546323?v=4'
        />
      </DropdownTrigger>
      <DropdownContent {...props}>
        <Box
          sx={{
            px: '2',
            py: '1',
            fs: 'md',
          }}
        >
          Signed in as <strong>@x1ngYu</strong>
        </Box>
        <DropdownDivider />
        <DropdownItem startIcon={<UserOutlined />}>Profile</DropdownItem>
        <DropdownItem startIcon={<StarOutlined />}>Stars</DropdownItem>
        <DropdownItem startIcon={<CodeSquareOutlined />}>Gists</DropdownItem>
        <DropdownItem startIcon={<HeartOutlined />}>Sponsors</DropdownItem>
        <DropdownItem startIcon={<SettingsOutlined />}>Settings</DropdownItem>
      </DropdownContent>
    </Dropdown>
  )
}

function DropdownShowcase() {
  const [selectedRadio, setSelectedRadio] = useState<string>('1')
  const [checkedItems, setCheckedItems] = useState<string[]>(['1'])

  return (
    <Dropdown defaultOpen>
      <DropdownTrigger>
        <Button>Open Dropdown</Button>
      </DropdownTrigger>
      <DropdownContent maxHeight={300} minWidth={200}>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem shortcut='⌘,'>Settings</DropdownItem>
        <DropdownItem shortcut='⌘Q'>Logout</DropdownItem>
        <DropdownDivider />
        <DropdownItemGroup>
          <DropdownItemGroupLabel>Projects</DropdownItemGroupLabel>
          <DropdownItem>Project 1</DropdownItem>
          <DropdownItem>Project 2</DropdownItem>
          <DropdownItem>Project 3</DropdownItem>
        </DropdownItemGroup>
        <DropdownCheckboxItemGroup
          value={checkedItems}
          onValueChange={setCheckedItems}
        >
          <DropdownItemGroupLabel>Languages</DropdownItemGroupLabel>
          <DropdownCheckboxItem value='1' startIcon='🇨🇳'>
            Chinese
          </DropdownCheckboxItem>
          <DropdownCheckboxItem value='2' startIcon='🇺🇸'>
            English
          </DropdownCheckboxItem>
          <DropdownCheckboxItem value='3' startIcon='🇫🇷'>
            French
          </DropdownCheckboxItem>
        </DropdownCheckboxItemGroup>
        <DropdownRadioItemGroup
          value={selectedRadio}
          onValueChange={setSelectedRadio}
        >
          <DropdownItemGroupLabel>Country</DropdownItemGroupLabel>
          <DropdownRadioItem value='1' startIcon='🇨🇳'>
            China
          </DropdownRadioItem>
          <DropdownRadioItem value='2' startIcon='🇺🇸'>
            United States
          </DropdownRadioItem>
        </DropdownRadioItemGroup>
      </DropdownContent>
    </Dropdown>
  )
}

export const Chromatic: Story = {
  render: () => {
    return (
      <>
        <WithLabel label='Showcase'>
          <DropdownShowcase />
        </WithLabel>
      </>
    )
  },
  parameters: {
    chromatic: {
      disable: false,
    },
    controls: {
      disable: true,
    },
  },
}
