import { BoltOutlined } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import { RADII, COLORS, toReadableRadius } from '~/sb/utils'
import { Alert } from '../Alert'
import { Flex } from '../../flex'
import { Button } from '../../button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const VARIANTS = ['faded', 'outlined', 'solid', 'subtle'] as const

const STATUSES = ['error', 'info', 'warning', 'success'] as const

const meta = {
  title: 'Components/Alert',
  component: Alert<'div'>,
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    radius: {
      control: 'select',
      options: RADII,
    },
    status: {
      control: 'select',
      options: STATUSES,
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    closable: {
      control: 'boolean',
    },
    hideIcon: {
      control: 'boolean',
    },
  },
  args: {
    description: 'This is an example alert description.',
  },
  render: (props) => <Alert title='Example Alert' {...props} />,
} satisfies Meta<typeof Alert<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description: undefined,
  },
}

export const WithDescription: Story = {}

export const Variants: Story = {
  render: (props) => {
    return (
      <Flex direction='column' gap='4'>
        {VARIANTS.map((variant) => (
          <Alert
            key={variant}
            {...props}
            variant={variant}
            title={`${upperFirst(variant)} Variant`}
          />
        ))}
      </Flex>
    )
  },
}

export const Colors: Story = {
  render: (props) => {
    return (
      <Flex direction='column' gap='4'>
        {COLORS.map((color) => (
          <Alert
            key={color}
            {...props}
            color={color}
            title={`${upperFirst(color)} Color`}
          />
        ))}
      </Flex>
    )
  },
}

export const Status: Story = {
  render: (props) => {
    return (
      <Flex direction='column' gap='4'>
        {STATUSES.map((status) => (
          <Alert
            key={status}
            {...props}
            status={status}
            title={`${upperFirst(status)} Status`}
          />
        ))}
      </Flex>
    )
  },
}

export const Radii: Story = {
  render: (props) => {
    return (
      <Flex direction='column' gap='4'>
        {RADII.map((radius) => (
          <Alert
            key={radius}
            {...props}
            radius={radius}
            title={`${toReadableRadius(radius)} Radius`}
          />
        ))}
      </Flex>
    )
  },
}

export const Closable: Story = {
  args: {
    closable: true,
  },
}

export const WithAction: Story = {
  args: {
    action: <Button size='sm'>Upgrade</Button>,
  },
}

export const WithoutIcon: Story = {
  args: {
    hideIcon: true,
  },
}

export const WithCustomIcon: Story = {
  args: {
    icon: <BoltOutlined />,
  },
}
