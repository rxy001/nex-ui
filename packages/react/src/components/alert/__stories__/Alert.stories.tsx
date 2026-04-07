import { BoltOutlined } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import { RADII, COLORS, toReadableRadius, WithLabel } from '~/sb/utils'
import { Alert } from '../Alert'
import { Button } from '../../button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { AlertProps } from '../types'

const VARIANTS = ['faded', 'outlined', 'solid', 'subtle'] as const

const STATUSES = ['error', 'info', 'warning', 'success'] as const

function AlertTemplate(props: AlertProps) {
  return (
    <Alert
      title='This is an alert'
      description='This is a description for the alert'
      {...props}
    />
  )
}

const meta = {
  title: 'Components/Alert',
  component: AlertTemplate,
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
  parameters: {
    controls: {
      exclude: ['action', 'icon'],
    },
  },
} satisfies Meta<typeof AlertTemplate>

export default meta

type Story = StoryObj<typeof meta>

export function Default(props: AlertProps) {
  return <Alert {...props} title='This is an alert' />
}

export const WithDescription: Story = {}

export function Variants(props: AlertProps) {
  return (
    <>
      {VARIANTS.map((variant) => (
        <WithLabel key={variant} label={`${upperFirst(variant)}Variant`}>
          <AlertTemplate {...props} variant={variant} />
        </WithLabel>
      ))}
    </>
  )
}

export function Colors(props: AlertProps) {
  return (
    <>
      {COLORS.map((color) => (
        <WithLabel key={color} label={`${upperFirst(color)}Color`}>
          <AlertTemplate {...props} color={color} />
        </WithLabel>
      ))}
    </>
  )
}

export function Status(props: AlertProps) {
  return (
    <>
      {STATUSES.map((status) => (
        <WithLabel key={status} label={`${upperFirst(status)}Status`}>
          <AlertTemplate {...props} status={status} />
        </WithLabel>
      ))}
    </>
  )
}

export function Radii(props: AlertProps) {
  return (
    <>
      {RADII.map((radius) => (
        <WithLabel key={radius} label={`${toReadableRadius(radius)}Radius`}>
          <AlertTemplate {...props} radius={radius} />
        </WithLabel>
      ))}
    </>
  )
}

export const Closable: Story = {
  args: {
    closable: true,
  },
}

export const WithAction: Story = {
  args: {
    action: (
      <Button size='sm' radius='sm'>
        Upgrade
      </Button>
    ),
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

export const Chromatic: Story = {
  render: () => (
    <>
      <WithLabel label='WithTitleAndDescription'>
        <AlertTemplate {...WithDescription.args} />
      </WithLabel>
      <WithLabel label='CyanColorAndSuccessStatus'>
        <AlertTemplate color='cyan' status='success' />
      </WithLabel>
      <WithLabel label='Closable'>
        <AlertTemplate {...Closable.args} />
      </WithLabel>
      <WithLabel label='WithAction'>
        <AlertTemplate {...WithAction.args} />
      </WithLabel>
      <WithLabel label='WithoutIcon'>
        <AlertTemplate {...WithoutIcon.args} />
      </WithLabel>
      <WithLabel label='WithCustomIcon'>
        <AlertTemplate {...WithCustomIcon.args} />
      </WithLabel>
      <Colors />
      <Variants />
      <Status />
      <Radii />
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
