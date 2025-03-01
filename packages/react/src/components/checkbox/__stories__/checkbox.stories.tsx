import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../Checkbox'
import { CheckboxGroup as CheckboxGroupComponent } from '../CheckboxGroup'

const HeartIcon = (props: any) => {
  return (
    <svg
      fill='currentColor'
      height={14}
      viewBox='0 0 24 24'
      width={14}
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
  component: Checkbox,
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
  },
  args: {
    color: 'blue',
    size: 'md',
    disabled: false,
    children: 'Checkbox',
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const BasicCheckbox: Story = {
  args: {},
}

export const CustomCheckIcon: Story = {
  args: {
    icon: <HeartIcon />,
  },
}

export const CheckboxGroup: Story = {
  render: ({ color, size, disabled, radius }) => (
    <CheckboxGroupComponent
      radius={radius}
      color={color}
      size={size}
      disabled={disabled}
    >
      <Checkbox value='apple'>Apple</Checkbox>
      <Checkbox value='pear'>Pear</Checkbox>
      <Checkbox value='orange'>Orange</Checkbox>
    </CheckboxGroupComponent>
  ),
}
