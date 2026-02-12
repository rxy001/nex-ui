import { GithubOutlined } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import {
  COLORS,
  SIZES as DEFAULT_SIZES,
  RADII as DEFAULT_RADII,
  toReadableSize,
  withLabel,
  toReadableRadius,
} from '~/sb/utils'
import { Badge } from '../Badge'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { BadgeProps } from '../types'

const SIZES = ['xs', ...DEFAULT_SIZES] as const
const RADII = ['xs', ...DEFAULT_RADII] as const
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

function renderColors(props?: BadgeProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) =>
        withLabel(`${upperFirst(color)}Color`)(
          <BadgeTemplate {...props} key={color} color={color} />,
        ),
      )}
    </Flex>
  )
}
export const Colors: Story = {
  render: renderColors,
}

function renderSizes(props?: BadgeProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) =>
        withLabel(`${toReadableSize(size)}Size`)(
          <BadgeTemplate {...props} key={size} size={size} />,
        ),
      )}
    </Flex>
  )
}
export const Sizes: Story = {
  render: renderSizes,
}

function renderRadii(props?: BadgeProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) =>
        withLabel(`${toReadableRadius(radius)}Radius`)(
          <BadgeTemplate {...props} key={radius} radius={radius} />,
        ),
      )}
    </Flex>
  )
}
export const Radius: Story = {
  render: renderRadii,
}

function renderVariants(props?: BadgeProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {VARIANTS.map((variant) =>
        withLabel(`${upperFirst(variant)}Variant`)(
          <BadgeTemplate {...props} key={variant} variant={variant} />,
        ),
      )}
    </Flex>
  )
}
export const Variants: Story = {
  render: renderVariants,
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

function renderWithIcons(props?: BadgeProps) {
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

export const WithIcons: Story = {
  render: renderWithIcons,
}

export const Chromatic: Story = {
  render: () => (
    <>
      {withLabel('ClosableBadge')(<BadgeTemplate {...Closable.args} />)}
      {withLabel('DisabledBadge')(<BadgeTemplate {...Disabled.args} />)}
      {withLabel('WithIcons')(renderWithIcons())}
      {renderColors()}
      {renderRadii()}
      {renderSizes()}
      {renderVariants()}
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
