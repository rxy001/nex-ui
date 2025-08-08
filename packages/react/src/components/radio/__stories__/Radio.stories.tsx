import { Radio } from '../Radio'
import { RadioGroup } from '../RadioGroup'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Radio',
  component: Radio<'input'>,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
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
  },
  args: {
    children: 'Radio',
  },
  render: () => {
    return (
      <RadioGroup>
        <Radio value='option1'>Option 1</Radio>
        <Radio value='option2'>Option 2</Radio>
        <Radio value='option3' disabled>
          Option 3 (disabled)
        </Radio>
      </RadioGroup>
    )
  },
} satisfies Meta<typeof Radio<'input'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
