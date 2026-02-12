import { SearchOutlined } from '@nex-ui/icons'
import {
  COLORS,
  SIZES,
  RADII,
  toReadableSize,
  toReadableRadius,
  WithLabel as WithLabelUtil,
} from '~/sb/utils'
import { useState } from 'react'
import { upperFirst } from '@nex-ui/utils'
import { Input } from '../Input'
import { Flex } from '../../flex'
import { Icon } from '../../icon'
import type { InputProps } from '../types'
import type { Meta, StoryObj } from '@storybook/react-vite'

const VARIANTS = ['faded', 'outlined', 'underlined'] as const

const LABEL_PLACEMENTS = [
  'float-outside',
  'float-inside',
  'inside',
  'outside',
] as const

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
      options: LABEL_PLACEMENTS,
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
    disableAnimation: {
      control: 'boolean',
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
    'aria-label': 'Disabled Input',
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    'aria-label': 'Invalid Input',
  },
}

export const Placeholder: Story = {
  args: {
    placeholder: 'Enter your text',
    'aria-label': 'Placeholder Input',
  },
}

export function Variants(props: InputProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {VARIANTS.map((variant) => (
        <WithLabelUtil key={variant} label={`${upperFirst(variant)}Variant`}>
          <Input {...props} variant={variant} label='Label' />
        </WithLabelUtil>
      ))}
    </Flex>
  )
}

export function Colors(props: InputProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <WithLabelUtil key={color} label={`${upperFirst(color)}Color`}>
          <Input {...props} label='Label' color={color} variant='faded' />
        </WithLabelUtil>
      ))}
    </Flex>
  )
}

export function Sizes(props: InputProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) => (
        <WithLabelUtil key={size} label={`${toReadableSize(size)}Size`}>
          <Input {...props} label='Label' size={size} />
        </WithLabelUtil>
      ))}
    </Flex>
  )
}

export function Radii(props: InputProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) => (
        <WithLabelUtil key={radius} label={`${toReadableRadius(radius)}Radius`}>
          <Input {...props} label='Label' radius={radius} />
        </WithLabelUtil>
      ))}
    </Flex>
  )
}

export function LabelPlacements(props: InputProps) {
  return (
    <Flex gap='5' wrap='wrap' align='end'>
      {LABEL_PLACEMENTS.map((placement) => (
        <WithLabelUtil key={placement} label={`${upperFirst(placement)}Label`}>
          <Input {...props} label='Label' labelPlacement={placement} />
        </WithLabelUtil>
      ))}
    </Flex>
  )
}

export const Clearable: Story = {
  args: {
    clearable: true,
    defaultValue: 'Clearable',
    'aria-label': 'Clearable Input',
  },
}

export function Controlled(props: InputProps) {
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

export function InputTypes(props: InputProps) {
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
      <Input {...props} label='Tel' placeholder='Enter your phone' type='tel' />
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
}

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
}

export function WithIcons(props: InputProps) {
  return (
    <Flex gap='5' align='end' wrap='wrap'>
      <Input {...props} prefix={<Icon as={SearchOutlined} />} label='Prefix' />
      <Input {...props} suffix={<Icon as={SearchOutlined} />} label='Suffix' />
    </Flex>
  )
}

export const Chromatic: Story = {
  render: () => (
    <>
      <Flex gap='5' wrap='wrap'>
        <WithLabelUtil label='Disabled'>
          <Input {...Disabled.args} />
        </WithLabelUtil>
        <WithLabelUtil label='Clearable'>
          <Input {...Clearable.args} />
        </WithLabelUtil>
        <WithLabelUtil label='WithLabel'>
          <Input {...WithLabel.args} />
        </WithLabelUtil>
        <WithLabelUtil label='Invalid'>
          <Input {...Invalid.args} />
        </WithLabelUtil>
        <WithLabelUtil label='Placeholder'>
          <Input {...Placeholder.args} />
        </WithLabelUtil>
        <WithLabelUtil label='WithIcons'>
          <WithIcons />
        </WithLabelUtil>
      </Flex>
      <Variants />
      <Colors />
      <Sizes />
      <Radii />
      <InputTypes />
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
