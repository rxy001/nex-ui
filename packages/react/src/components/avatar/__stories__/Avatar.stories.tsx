import { UserOutlined } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import {
  RADII as DEFAULT_RADII,
  SIZES as DEFAULT_SIZES,
  COLORS,
  toReadableRadius,
  toReadableSize,
  withLabel,
} from '~/sb/utils'
import { Avatar } from '../Avatar'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { AvatarProps } from '../types'

const RADII = [...DEFAULT_RADII, 'xl'] as const

const SIZES = [...DEFAULT_SIZES, 'xl'] as const

const meta = {
  title: 'Components/Avatar',
  component: Avatar<'div'>,
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    radius: {
      control: 'select',
      options: RADII,
    },
    color: {
      options: COLORS,
      control: 'select',
    },
    outlined: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Avatar<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LetterAvatar: Story = {
  args: {
    children: 'X',
  },
}

export const ImageAvatar: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/25546323?v=4',
    alt: 'X',
  },
}

export const IconAvatar: Story = {
  args: {
    children: <UserOutlined />,
  },
}

function renderFallbacks(props?: AvatarProps) {
  return (
    <Flex gap='5'>
      <Avatar {...props} src='https://xxx.com' alt='X'>
        <UserOutlined />
      </Avatar>
      <Avatar {...props} src='https://xxx.com' alt='X' />
    </Flex>
  )
}
export const Fallbacks: Story = {
  render: renderFallbacks,
}

function renderSizes(props?: AvatarProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) =>
        withLabel(`${toReadableSize(size)}Size`)(
          <Avatar {...props} key={size} size={size}>
            X
          </Avatar>,
        ),
      )}
    </Flex>
  )
}
export const Sizes: Story = {
  render: renderSizes,
}

function renderRadii(props?: AvatarProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) =>
        withLabel(`${toReadableRadius(radius)}Radius`)(
          <Avatar {...props} key={radius} radius={radius}>
            X
          </Avatar>,
        ),
      )}
    </Flex>
  )
}
export const Radii: Story = {
  render: renderRadii,
}

function renderColors(props?: AvatarProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) =>
        withLabel(`${upperFirst(color)}Color`)(
          <Avatar {...props} key={color} color={color}>
            X
          </Avatar>,
        ),
      )}
    </Flex>
  )
}
export const Colors: Story = {
  render: renderColors,
}

export const Outlined: Story = {
  args: {
    outlined: true,
    children: 'X',
  },
}

export const Chromatic: Story = {
  render: () => (
    <>
      <Flex gap='5' wrap='wrap'>
        {withLabel('LetterAvatar')(<Avatar {...LetterAvatar.args} />)}
        {withLabel('ImageAvatar')(<Avatar {...ImageAvatar.args} />)}
        {withLabel('IconAvatar')(<Avatar {...IconAvatar.args} />)}
        {withLabel('Outlined')(<Avatar {...Outlined.args} />)}
        {withLabel('Fallbacks')(renderFallbacks())}
      </Flex>
      {renderSizes()}
      {renderRadii()}
      {renderColors()}
    </>
  ),
  parameters: {
    chromatic: {
      disable: false,
    },
    controls: {
      disable: true,
    },
  },
}
