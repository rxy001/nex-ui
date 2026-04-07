import { UserOutlined } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import {
  RADII,
  SIZES,
  COLORS,
  toReadableRadius,
  toReadableSize,
  WithLabel,
} from '~/sb/utils'
import { Avatar } from '../Avatar'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { AvatarProps } from '../types'

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
  parameters: {
    controls: {
      exclude: ['children', 'src'],
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

export function Fallbacks(props: AvatarProps) {
  return (
    <Flex gap='5'>
      <Avatar {...props} src='https://xxx.com' alt='X'>
        <UserOutlined />
      </Avatar>
      <Avatar {...props} src='https://xxx.com' alt='X' />
    </Flex>
  )
}

export function Sizes(props: AvatarProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) => (
        <WithLabel key={size} label={`${toReadableSize(size)}Size`}>
          <Avatar {...props} size={size}>
            X
          </Avatar>
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Radii(props: AvatarProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) => (
        <WithLabel key={radius} label={`${toReadableRadius(radius)}Radius`}>
          <Avatar {...props} radius={radius}>
            X
          </Avatar>
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Colors(props: AvatarProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <WithLabel key={color} label={`${upperFirst(color)}Color`}>
          <Avatar {...props} color={color}>
            X
          </Avatar>
        </WithLabel>
      ))}
    </Flex>
  )
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
        <WithLabel label='LetterAvatar'>
          <Avatar {...LetterAvatar.args} />
        </WithLabel>
        <WithLabel label='ImageAvatar'>
          <Avatar {...ImageAvatar.args} />
        </WithLabel>
        <WithLabel label='IconAvatar'>
          <Avatar {...IconAvatar.args} />
        </WithLabel>
        <WithLabel label='Outlined'>
          <Avatar {...Outlined.args} />
        </WithLabel>
        <WithLabel label='Fallbacks'>
          <Fallbacks />
        </WithLabel>
      </Flex>
      <Sizes />
      <Radii />
      <Colors />
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
