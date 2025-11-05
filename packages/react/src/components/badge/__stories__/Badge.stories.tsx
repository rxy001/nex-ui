import { GithubOutlined } from '@nex-ui/icons'
import { Badge } from '../Badge'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
const radii = ['none', 'xs', 'sm', 'md', 'lg', 'full'] as const
const colors = [
  'blue',
  'orange',
  'cyan',
  'gray',
  'red',
  'green',
  'pink',
  'purple',
  'yellow',
] as const
const variants = ['solid', 'subtle', 'outlined', 'faded'] as const

const meta = {
  title: 'Components/Badge',
  component: Badge<'span'>,
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
    },
    radius: {
      control: 'select',
      options: radii,
    },
    color: {
      options: colors,
      control: 'select',
    },
    variant: {
      control: 'select',
      options: variants,
    },
    closable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    color: 'blue',
    size: 'lg',
    radius: 'md',
    children: 'Badge',
  },
} satisfies Meta<typeof Badge<'span'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Colors: Story = {
  render: (args) => (
    <Flex gap='5'>
      {colors.map((color) => (
        <Badge
          {...args}
          key={color}
          color={color}
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {color}
        </Badge>
      ))}
    </Flex>
  ),
}

const sizeText = {
  xs: 'Extra Small',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

export const Sizes: Story = {
  render: (args) => (
    <Flex gap='5' align='center'>
      {sizes.map((size) => (
        <Badge {...args} key={size} size={size}>
          {sizeText[size]}
        </Badge>
      ))}
    </Flex>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <Flex gap='5' align='center'>
      {variants.map((variant) => (
        <Badge
          key={variant}
          variant={variant}
          sx={{
            textTransform: 'capitalize',
          }}
          {...args}
        >
          {variant}
        </Badge>
      ))}
    </Flex>
  ),
}

export const Closable: Story = {
  render: (args) => (
    <Badge {...args} closable>
      Closable Badge
    </Badge>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithIcons: Story = {
  render: (args) => (
    <Flex gap='4'>
      <Badge startIcon={<GithubOutlined />} {...args}>
        Github
      </Badge>
      <Badge endIcon={<GithubOutlined />} {...args}>
        Github
      </Badge>
    </Flex>
  ),
}
