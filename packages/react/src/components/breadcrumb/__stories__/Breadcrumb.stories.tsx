import { upperFirst } from '@nex-ui/utils'
import {
  SIZES,
  COLORS as DEFAULT_COLORS,
  WithLabel,
  toReadableSize,
} from '~/sb/utils'
import { Breadcrumb } from '../Breadcrumb'
import { BreadcrumbItem } from '../BreadcrumbItem'
import { Flex } from '../../flex'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { BreadcrumbProps } from '../types'

const COLORS = [...DEFAULT_COLORS, 'default'] as const

function BreadcrumbTemplate(props: BreadcrumbProps) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem href='#'>Home</BreadcrumbItem>
      <BreadcrumbItem href='#'>Category</BreadcrumbItem>
      <BreadcrumbItem href='#'>Subcategory</BreadcrumbItem>
      <BreadcrumbItem href='#'>Product</BreadcrumbItem>
    </Breadcrumb>
  )
}

const meta = {
  title: 'Components/Breadcrumb',
  component: BreadcrumbTemplate,
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
} satisfies Meta<typeof BreadcrumbTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export function Sizes(props: BreadcrumbProps) {
  return (
    <Flex direction='column' gap='5'>
      {SIZES.map((size) => (
        <WithLabel key={size} label={`${toReadableSize(size)}Size`}>
          <BreadcrumbTemplate {...props} size={size} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Colors(props: BreadcrumbProps) {
  return (
    <Flex direction='column' gap='5'>
      {COLORS.map((color) => (
        <WithLabel key={color} label={`${upperFirst(color)}Color`}>
          <BreadcrumbTemplate {...props} color={color} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function WithIcons(props: BreadcrumbProps) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem href='#'>🏠 Home</BreadcrumbItem>
      <BreadcrumbItem href='#'>📁 Components</BreadcrumbItem>
      <BreadcrumbItem href='#'>📦 Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  )
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

export const Chromatic: Story = {
  render: () => (
    <>
      <WithLabel label='Collapsed'>
        <BreadcrumbTemplate {...Collapsed.args} />
      </WithLabel>
      <WithLabel label='CustomSeparator'>
        <BreadcrumbTemplate {...CustomSeparator.args} />
      </WithLabel>
      <WithLabel label='CustomSeparatorGap'>
        <BreadcrumbTemplate {...CustomSeparatorGap.args} />
      </WithLabel>
      <WithLabel label='WithIcons'>
        <WithIcons />
      </WithLabel>
      <Sizes />
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
