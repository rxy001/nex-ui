import { Alert } from '../Alert'
import { Flex } from '../../flex'
import { Button } from '../../button'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Alert',
  component: Alert<'div'>,
  argTypes: {
    variant: {
      control: 'select',
      options: ['faded', 'outlined', 'solid', 'subtle'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    status: {
      control: 'select',
      options: ['error', 'info', 'warning', 'success'],
    },
    closable: {
      control: 'boolean',
    },
  },
  args: {
    variant: 'faded',
    status: 'info',
    closable: false,
  },
  render: (props) => <Alert title='Example Alert' {...props} />,
} satisfies Meta<typeof Alert<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: {
    description: 'This is an example alert description.',
  },
}

export const Variants: Story = {
  render: (props) => {
    return (
      <Flex direction='column' gap='4'>
        <Alert
          {...props}
          variant='faded'
          title='Faded Variant'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          variant='solid'
          title='Solid Variant'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          variant='outlined'
          title='Outlined Variant'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          variant='subtle'
          title='Subtle Variant'
          description='This is an example alert description.'
        />
      </Flex>
    )
  },
}

export const Colors: Story = {
  render: (props) => {
    return (
      <Flex direction='column' gap='4'>
        <Alert
          {...props}
          color='blue'
          title='Blue Color'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='cyan'
          title='Cyan Color'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='gray'
          title='Gray Color'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='red'
          title='Red Color'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='yellow'
          title='Yellow Color'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='purple'
          title='Purple Color'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='pink'
          title='Pink Color'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='green'
          title='Green Color'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='orange'
          title='Orange Color'
          description='This is an example alert description.'
        />
      </Flex>
    )
  },
}

export const Status: Story = {
  render: (props) => {
    return (
      <Flex direction='column' gap='4'>
        <Alert
          {...props}
          status='info'
          title='Info Alert'
          description='This is an info alert.'
        />
        <Alert
          {...props}
          status='success'
          title='Success Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          status='warning'
          title='Warning Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          status='error'
          title='Error Alert'
          description='This is an example alert description.'
        />
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

export const Radius: Story = {
  render: (props) => {
    return (
      <Flex direction='column' gap='4'>
        <Alert
          {...props}
          radius='none'
          title='None Radius'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          radius='sm'
          title='Small Radius'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          radius='md'
          title='Medium Radius'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          radius='lg'
          title='Large Radius'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          radius='full'
          title='Full Radius'
          description='This is an example alert description.'
        />
      </Flex>
    )
  },
}
