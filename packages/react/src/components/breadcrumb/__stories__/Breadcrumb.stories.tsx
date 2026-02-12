import { upperFirst } from '@nex-ui/utils'
import {
  SIZES,
  COLORS as DEFAULT_COLORS,
  withLabel,
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

function renderSizes(props?: BreadcrumbProps) {
  return (
    <Flex direction='column' gap='5'>
      {SIZES.map((size) =>
        withLabel(`${toReadableSize(size)}Size`)(
          <BreadcrumbTemplate {...props} key={size} size={size} />,
        ),
      )}
    </Flex>
  )
}
export const Sizes: Story = {
  render: renderSizes,
}

function renderColors(props?: BreadcrumbProps) {
  return (
    <Flex direction='column' gap='5'>
      {COLORS.map((color) =>
        withLabel(`${upperFirst(color)}Color`)(
          <BreadcrumbTemplate {...props} key={color} color={color} />,
        ),
      )}
    </Flex>
  )
}
export const Colors: Story = {
  render: renderColors,
}

function renderWithIcons(props?: BreadcrumbProps) {
  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem href='#'>🏠 Home</BreadcrumbItem>
      <BreadcrumbItem href='#'>📁 Components</BreadcrumbItem>
      <BreadcrumbItem href='#'>📦 Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  )
}
export const WithIcons: Story = {
  render: renderWithIcons,
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
      {withLabel('Collapsed')(<BreadcrumbTemplate {...Collapsed.args} />)}
      {withLabel('CustomSeparator')(
        <BreadcrumbTemplate {...CustomSeparator.args} />,
      )}
      {withLabel('CustomSeparatorGap')(
        <BreadcrumbTemplate {...CustomSeparatorGap.args} />,
      )}
      {withLabel('WithIcons')(renderWithIcons())}
      {renderSizes()}
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
