import { GithubOutlined } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import {
  COLORS,
  SIZES,
  RADII,
  toReadableSize,
  WithLabel,
  toReadableRadius,
} from '~/sb/utils'
import { Badge } from '../Badge'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { BadgeProps } from '../types'

const VARIANTS = ['solid', 'subtle', 'outlined', 'faded'] as const

function BadgeTemplate(props: BadgeProps) {
  return <Badge {...props}>Badge</Badge>
}

const meta = {
  title: 'Components/Badge',
  component: BadgeTemplate,
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
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    closable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof BadgeTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export function Colors(props: BadgeProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <WithLabel key={color} label={`${upperFirst(color)}Color`}>
          <BadgeTemplate {...props} color={color} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Sizes(props: BadgeProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) => (
        <WithLabel key={size} label={`${toReadableSize(size)}Size`}>
          <BadgeTemplate {...props} size={size} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Radii(props: BadgeProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) => (
        <WithLabel key={radius} label={`${toReadableRadius(radius)}Radius`}>
          <BadgeTemplate {...props} radius={radius} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Variants(props: BadgeProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {VARIANTS.map((variant) => (
        <WithLabel key={variant} label={`${upperFirst(variant)}Variant`}>
          <BadgeTemplate {...props} variant={variant} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export const Closable: Story = {
  args: {
    closable: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export function WithIcons(props: BadgeProps) {
  return (
    <Flex gap='5'>
      <Badge startIcon={<GithubOutlined />} {...props}>
        Github
      </Badge>
      <Badge endIcon={<GithubOutlined />} {...props}>
        Github
      </Badge>
    </Flex>
  )
}

export const Chromatic: Story = {
  render: () => (
    <>
      <WithLabel label='ClosableBadge'>
        <BadgeTemplate {...Closable.args} />
      </WithLabel>
      <WithLabel label='DisabledBadge'>
        <BadgeTemplate {...Disabled.args} />
      </WithLabel>
      <WithLabel label='WithIcons'>
        <WithIcons />
      </WithLabel>
      <Colors />
      <Radii />
      <Sizes />
      <Variants />
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
