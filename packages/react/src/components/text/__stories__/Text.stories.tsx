import { Flex } from '../../flex'
import { Text } from '../Text'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Truncate: Story = {
  args: {
    truncate: true,
    maxW: 'xs',
    as: 'p',
  },
}

export const Underline: Story = {
  args: {
    underline: true,
  },
}

export const Strikethrough: Story = {
  args: {
    strikethrough: true,
  },
}

export const Weights: Story = {
  render: () => (
    <Flex direction='column' gap='5'>
      <Text fontWeight='hairline'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text fontWeight='thin'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text fontWeight='light'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text fontWeight='normal'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text fontWeight='medium'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text fontWeight='semibold'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text fontWeight='bold'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text fontWeight='extrabold'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text fontWeight='black'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
    </Flex>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Flex direction='column' gap='5'>
      <Text size='xs'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text size='sm'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text size='md'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text size='lg'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text size='xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text size='2xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text size='3xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text size='4xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
    </Flex>
  ),
}
