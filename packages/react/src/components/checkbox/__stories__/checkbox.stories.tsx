import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../Checkbox'
import type { CheckboxProps } from '../types'

const HeartIcon = (props: any) => {
  return (
    <svg
      fill='currentColor'
      height='1em'
      viewBox='0 0 24 24'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
      />
    </svg>
  )
}

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox<'input'>,
  argTypes: {
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
    disabled: {
      control: 'boolean',
    },
    defaultChecked: {
      control: 'boolean',
    },
  },
  args: {
    color: 'blue',
    size: 'md',
    disabled: false,
    children: 'Checkbox',
    defaultChecked: false,
  },
} satisfies Meta<typeof Checkbox<'input'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DefaultChecked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const CustomCheckIcon: Story = {
  args: {
    icon: <HeartIcon />,
  },
}

function ControlledTemplate(props: CheckboxProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <Checkbox {...props} checked={checked} onCheckedChange={setChecked}>
        Controlled Checkbox
      </Checkbox>
      <p>checked: {checked ? 'true' : 'false'}</p>
    </div>
  )
}

export const Controlled: Story = {
  render: ControlledTemplate,
}
