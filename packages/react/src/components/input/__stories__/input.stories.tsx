import type { Meta, StoryObj } from '@storybook/react'
import { SearchOutlined } from '@nex-ui/icons'
import { Input } from '../Input'
import { Flex } from '../../flex'
import { Icon } from '../../icon'
import { useState } from 'react'
import { InputProps } from '../types'

const meta = {
  title: 'Components/Input',
  component: Input<'input'>,
  argTypes: {
    variant: {
      options: ['filled', 'outlined', 'underlined'],
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
    invaild: {
      control: 'boolean',
    },
    color: {
      options: [
        'blue',
        'orange',
        'cyan',
        'gray',
        'red',
        'green',
        'pink',
        'purple',
        'yellow',
      ],
      control: 'select',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: 'select',
    },
    radius: {
      options: ['sm', 'md', 'lg', 'full', 'none'],
      control: 'select',
    },
    clearable: {
      control: 'boolean',
    },
    labelPlacement: {
      options: ['float-outside', 'float-inside', 'inside', 'outside'],
      control: 'select',
    },
    type: {
      options: [
        'text',
        'email',
        'password',
        'number',
        'search',
        'tel',
        'url',
        'date',
        'datetime-local',
        'month',
        'time',
        'week',
      ],
      control: 'select',
    },
  },
  args: {
    variant: 'outlined',
    disabled: false,
    size: 'md',
    color: 'blue',
    invaild: false,
    clearable: false,
    labelPlacement: 'float-outside',
    type: 'text',
  },
} satisfies Meta<typeof Input<'input'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Input',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Disabled-input',
  },
}

export const Variants: Story = {
  render: (args) => {
    return (
      <>
        <Flex gap='5'>
          <Input {...args} variant='outlined' label='Outlined' />
          <Input {...args} variant='filled' label='Filled' />
          <Input {...args} variant='underlined' label='Underlined' />
        </Flex>
        <Flex gap='5' sx={{ mt: '10' }}>
          <Input
            {...args}
            placeholder='Placeholder'
            variant='outlined'
            label='Outlined'
          />
          <Input
            {...args}
            placeholder='Placeholder'
            variant='filled'
            label='Filled'
          />
          <Input
            {...args}
            placeholder='Placeholder'
            variant='underlined'
            label='Underlined'
          />
        </Flex>
      </>
    )
  },
}

export const LabelPlacement: Story = {
  render: (args) => {
    return (
      <>
        <Flex gap='5' align='end'>
          <Input
            {...args}
            label='FloatOutside'
            labelPlacement='float-outside'
          />
          <Input {...args} label='FloatInside' labelPlacement='float-inside' />
        </Flex>
        <Flex gap='5' align='end' sx={{ mt: '10' }}>
          <Input {...args} label='Outside' labelPlacement='outside' />
          <Input {...args} label='Inside' labelPlacement='inside' />
        </Flex>
      </>
    )
  },
}

export const Clearable: Story = {
  args: {
    clearable: true,
    defaultValue: 'Clearable',
    label: 'Clearable',
  },
}

function ControlledTemplate(props: InputProps) {
  const [value, setValue] = useState('')

  return (
    <Flex direction='column' gap='5' sx={{ maxWidth: '300px' }}>
      <Input
        {...props}
        label='Controlled'
        value={value}
        onValueChange={setValue}
      />
      <p>value: {value}</p>
    </Flex>
  )
}

export const Controlled: Story = {
  render: ControlledTemplate,
}

export const InputTypes: Story = {
  render: (args) => {
    return (
      <Flex gap='5' wrap='wrap' sx={{ '& > div': { width: '250px' } }}>
        <Input {...args} label='Text' placeholder='Enter your text' />
        <Input
          {...args}
          label='Number'
          placeholder='Enter your number'
          type='number'
        />
        <Input
          {...args}
          label='Password'
          placeholder='Enter your password'
          type='password'
        />
        <Input
          {...args}
          label='Email'
          placeholder='Enter your email'
          type='email'
        />
        <Input {...args} label='URL' placeholder='Enter your url' type='url' />
        <Input
          {...args}
          label='Search'
          placeholder='Enter your search'
          type='search'
        />
        <Input
          {...args}
          label='Tel'
          placeholder='Enter your phone'
          type='tel'
        />
        <Input {...args} label='Date' type='date' />
        <Input
          {...args}
          label='Time'
          placeholder='Enter your time'
          type='time'
        />
        <Input
          {...args}
          label='Month'
          placeholder='Enter your month'
          type='month'
        />
        <Input
          {...args}
          label='Week'
          placeholder='Enter your week'
          type='week'
        />
      </Flex>
    )
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
}

export const WithIcons: Story = {
  render: (args) => {
    return (
      <>
        <Flex gap='5' align='end'>
          <Input
            {...args}
            prefix={<Icon as={SearchOutlined} />}
            label='Prefix'
          />
          <Input
            {...args}
            suffix={<Icon as={SearchOutlined} />}
            label='Suffix'
          />
        </Flex>
      </>
    )
  },
}
