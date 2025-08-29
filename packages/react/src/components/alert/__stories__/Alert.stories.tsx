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
          title='Faded Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          variant='solid'
          title='Solid Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          variant='outlined'
          title='Outlined Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          variant='subtle'
          title='Subtle Alert'
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
          title='Blue Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='cyan'
          title='Cyan Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='gray'
          title='Gray Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='red'
          title='Red Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='yellow'
          title='Yellow Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='purple'
          title='Purple Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='pink'
          title='Pink Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='green'
          title='Green Alert'
          description='This is an example alert description.'
        />
        <Alert
          {...props}
          color='orange'
          title='Orange Alert'
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
          title='Info Alert'
          description='This is an info alert.'
        />
        <Alert
          {...props}
          radius='sm'
          title='Success Alert'
          description='This is a success alert.'
        />
        <Alert
          {...props}
          radius='md'
          title='Warning Alert'
          description='This is a warning alert.'
        />
        <Alert
          {...props}
          radius='lg'
          title='Warning Alert'
          description='This is a warning alert.'
        />
        <Alert
          {...props}
          radius='full'
          title='Error Alert'
          description='This is an error alert.'
        />
      </Flex>
    )
  },
}
