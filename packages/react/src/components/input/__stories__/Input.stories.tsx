import { SearchOutlined } from '@nex-ui/icons'
import {
  COLORS,
  SIZES,
  RADII,
  toReadableSize,
  toReadableRadius,
  withLabel,
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

function renderVariants(props?: InputProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {VARIANTS.map((variant) =>
        withLabel(`${upperFirst(variant)}Variant`)(
          <Input {...props} key={variant} variant={variant} label='Label' />,
        ),
      )}
    </Flex>
  )
}
export const Variants: Story = {
  render: renderVariants,
}

function renderColors(props?: InputProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) =>
        withLabel(`${upperFirst(color)}Color`)(
          <Input
            {...props}
            key={color}
            label='Label'
            color={color}
            variant='faded'
          />,
        ),
      )}
    </Flex>
  )
}
export const Colors: Story = {
  render: renderColors,
}

function renderSizes(props?: InputProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) =>
        withLabel(`${toReadableSize(size)}Size`)(
          <Input {...props} label='Label' key={size} size={size} />,
        ),
      )}
    </Flex>
  )
}
export const Sizes: Story = {
  render: renderSizes,
}

function renderRadii(props?: InputProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {RADII.map((radius) =>
        withLabel(`${toReadableRadius(radius)}Radius`)(
          <Input {...props} key={radius} label='Label' radius={radius} />,
        ),
      )}
    </Flex>
  )
}
export const Radius: Story = {
  render: renderRadii,
}

function renderLabelPlacements(props?: InputProps) {
  return (
    <Flex gap='5' wrap='wrap' align='end'>
      {LABEL_PLACEMENTS.map((placement) =>
        withLabel(`${upperFirst(placement)}Label`)(
          <Input
            {...props}
            key={placement}
            label='Label'
            labelPlacement={placement}
          />,
        ),
      )}
    </Flex>
  )
}
export const LabelPlacement: Story = {
  render: renderLabelPlacements,
}

export const Clearable: Story = {
  args: {
    clearable: true,
    defaultValue: 'Clearable',
    'aria-label': 'Clearable Input',
  },
}

function ControlledInput(props: InputProps) {
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
  render: (props) => <ControlledInput {...props} />,
}

function renderInputTypes(props?: InputProps) {
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
export const InputTypes: Story = {
  render: renderInputTypes,
}

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
}

function renderWithIcons(props?: InputProps) {
  return (
    <Flex gap='5' align='end' wrap='wrap'>
      <Input {...props} prefix={<Icon as={SearchOutlined} />} label='Prefix' />
      <Input {...props} suffix={<Icon as={SearchOutlined} />} label='Suffix' />
    </Flex>
  )
}
export const WithIcons: Story = {
  render: renderWithIcons,
}

export const Chromatic: Story = {
  render: () => (
    <>
      <Flex gap='5' wrap='wrap'>
        {withLabel('Disabled')(<Input {...Disabled.args} />)}
        {withLabel('Clearable')(<Input {...Clearable.args} />)}
        {withLabel('WithLabel')(<Input {...WithLabel.args} />)}
        {withLabel('Invalid')(<Input {...Invalid.args} />)}
        {withLabel('Placeholder')(<Input {...Placeholder.args} />)}
        {withLabel('WithIcons')(renderWithIcons())}
      </Flex>
      {renderVariants()}
      {renderColors()}
      {renderSizes()}
      {renderRadii()}
      {renderInputTypes()}
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
