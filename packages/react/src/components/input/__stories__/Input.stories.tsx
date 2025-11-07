import { SearchOutlined } from '@nex-ui/icons'
import {
  COLORS,
  SIZES,
  RADII,
  toReadableSize,
  toReadableRadius,
} from '~/sb/utils'
import { useState } from 'react'
import { upperFirst } from '@nex-ui/utils'
import { Input } from '../Input'
import { Flex } from '../../flex'
import { Icon } from '../../icon'
import type { InputProps } from '../types'
import type { Meta, StoryObj } from '@storybook/react-vite'

const VARIANTS = ['faded', 'outlined', 'underlined'] as const

const meta = {
  title: 'Components/Input',
  component: Input<'input'>,
  argTypes: {
    variant: {
      options: VARIANTS,
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
    color: {
      options: COLORS,
      control: 'select',
    },
    size: {
      options: SIZES,
      control: 'select',
    },
    radius: {
      options: RADII,
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
  render: (props) => {
    return (
      <Flex gap='5'>
        {VARIANTS.map((variant) => (
          <Input
            {...props}
            key={variant}
            variant={variant}
            label='Variant'
            defaultValue={upperFirst(variant)}
          />
        ))}
      </Flex>
    )
  },
}

export const Colors: Story = {
  render: (props) => (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <Input
          {...props}
          key={color}
          label='Color'
          defaultValue={upperFirst(color)}
          color={color}
        />
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  render: (props) => (
    <Flex gap='5' align='end'>
      {SIZES.map((size) => (
        <Input
          {...props}
          label='Size'
          key={size}
          size={size}
          defaultValue={toReadableSize(size)}
        />
      ))}
    </Flex>
  ),
}

export const Radius: Story = {
  render: (props) => (
    <Flex gap='5' align='end'>
      {RADII.map((radius) => (
        <Input
          {...props}
          key={radius}
          label='Radius'
          radius={radius}
          defaultValue={toReadableRadius(radius)}
        />
      ))}
    </Flex>
  ),
}

export const LabelPlacement: Story = {
  render: (props) => {
    return (
      <>
        <Flex gap='5' align='end'>
          <Input
            {...props}
            label='FloatOutside'
            labelPlacement='float-outside'
          />
          <Input {...props} label='FloatInside' labelPlacement='float-inside' />
        </Flex>
        <Flex gap='5' align='end' sx={{ mt: '10' }}>
          <Input {...props} label='Outside' labelPlacement='outside' />
          <Input {...props} label='Inside' labelPlacement='inside' />
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
  render: (props) => {
    return (
      <Flex gap='5' wrap='wrap' sx={{ '& > div': { width: '250px' } }}>
        <Input {...props} label='Text' placeholder='Enter your text' />
        <Input
          {...props}
          label='Number'
          placeholder='Enter your number'
          type='number'
        />
        <Input
          {...props}
          label='Password'
          placeholder='Enter your password'
          type='password'
        />
        <Input
          {...props}
          label='Email'
          placeholder='Enter your email'
          type='email'
        />
        <Input {...props} label='URL' placeholder='Enter your url' type='url' />
        <Input
          {...props}
          label='Search'
          placeholder='Enter your search'
          type='search'
        />
        <Input
          {...props}
          label='Tel'
          placeholder='Enter your phone'
          type='tel'
        />
        <Input {...props} label='Date' type='date' />
        <Input
          {...props}
          label='Time'
          placeholder='Enter your time'
          type='time'
        />
        <Input
          {...props}
          label='Month'
          placeholder='Enter your month'
          type='month'
        />
        <Input
          {...props}
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
  render: (props) => {
    return (
      <>
        <Flex gap='5' align='end'>
          <Input
            {...props}
            prefix={<Icon as={SearchOutlined} />}
            label='Prefix'
          />
          <Input
            {...props}
            suffix={<Icon as={SearchOutlined} />}
            label='Suffix'
          />
        </Flex>
      </>
    )
  },
}
