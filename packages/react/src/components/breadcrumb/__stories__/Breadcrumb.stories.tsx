import { SIZES, COLORS as DEFAULT_COLORS } from '~/sb/utils'
import { Breadcrumb } from '../Breadcrumb'
import { BreadcrumbItem } from '../BreadcrumbItem'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { BreadcrumbProps } from '../types'

const COLORS = [...DEFAULT_COLORS, 'default'] as const

function Template(props: BreadcrumbProps) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Category</BreadcrumbItem>
      <BreadcrumbItem>Subcategory</BreadcrumbItem>
      <BreadcrumbItem>Product</BreadcrumbItem>
    </Breadcrumb>
  )
}

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb<'nav'>,
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    color: {
      options: COLORS,
      control: 'select',
    },
    separatorGap: {
      control: 'number',
    },
  },
  render: (props) => {
    return <Template {...props} />
  },
} satisfies Meta<typeof Breadcrumb<'nav'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: (props) => (
    <Flex direction='column' gap='4'>
      {SIZES.map((size) => (
        <Template key={size} {...props} size={size} />
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  render: (props) => (
    <Flex direction='column' gap='4'>
      {COLORS.map((color) => (
        <Template key={color} {...props} color={color} />
      ))}
    </Flex>
  ),
}

export const WithIcons: Story = {
  render: (props) => (
    <Breadcrumb {...props}>
      <BreadcrumbItem>🏠 Home</BreadcrumbItem>
      <BreadcrumbItem>📁 Components</BreadcrumbItem>
      <BreadcrumbItem>📦 Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  ),
}

export const Collapsed: Story = {
  args: {
    maxItems: 3,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 1,
  },
}

export const CustomSeparator: Story = {
  args: {
    separator: '-',
  },
}

export const CustomSeparatorGap: Story = {
  args: {
    separatorGap: 15,
  },
}
