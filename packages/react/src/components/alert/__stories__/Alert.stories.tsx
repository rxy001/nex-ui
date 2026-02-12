import { BoltOutlined } from '@nex-ui/icons'
import { upperFirst } from '@nex-ui/utils'
import { RADII, COLORS, toReadableRadius, withLabel } from '~/sb/utils'
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
} satisfies Meta<typeof AlertTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (props) => <Alert {...props} title='This is an alert' />,
}

export const WithDescription: Story = {}

function renderVariants(props?: AlertProps) {
  return (
    <>
      {VARIANTS.map((variant) =>
        withLabel(`${upperFirst(variant)}Variant`)(
          <AlertTemplate key={variant} {...props} variant={variant} />,
        ),
      )}
    </>
  )
}
export const Variants: Story = {
  render: renderVariants,
}

function renderColors(props?: AlertProps) {
  return (
    <>
      {COLORS.map((color) =>
        withLabel(`${upperFirst(color)}Color`)(
          <AlertTemplate key={color} {...props} color={color} />,
        ),
      )}
    </>
  )
}
export const Colors: Story = {
  render: renderColors,
}

function renderStatus(props?: AlertProps) {
  return (
    <>
      {STATUSES.map((status) =>
        withLabel(`${upperFirst(status)}Status`)(
          <AlertTemplate key={status} {...props} status={status} />,
        ),
      )}
    </>
  )
}
export const Status: Story = {
  render: renderStatus,
}

function renderRadii(props?: AlertProps) {
  return (
    <>
      {RADII.map((radius) =>
        withLabel(`${toReadableRadius(radius)}Radius`)(
          <AlertTemplate key={radius} {...props} radius={radius} />,
        ),
      )}
    </>
  )
}
export const Radii: Story = {
  render: renderRadii,
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

export const Chromatic: Story = {
  render: () => (
    <>
      {withLabel('WithTitleAndDescription')(
        <AlertTemplate {...WithDescription.args} />,
      )}
      {withLabel('CyanColorAndSuccessStatus')(
        <AlertTemplate color='cyan' status='success' />,
      )}
      {withLabel('Closable')(<AlertTemplate {...Closable.args} />)}
      {withLabel('WithAction')(<AlertTemplate {...WithAction.args} />)}
      {withLabel('WithoutIcon')(<AlertTemplate {...WithoutIcon.args} />)}
      {withLabel('WithCustomIcon')(<AlertTemplate {...WithCustomIcon.args} />)}
      {renderColors()}
      {renderVariants()}
      {renderRadii()}
      {renderStatus()}
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
