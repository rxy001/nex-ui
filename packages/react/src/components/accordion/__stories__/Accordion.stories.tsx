import { useState } from 'react'
import { Accordion } from '../Accordion'
import { AccordionItem } from '../AccordionItem'
import { Flex } from '../../flex'
import type { Key } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { AccordionProps } from '../types'

const Text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.'

const AccordionTemplate = (props: AccordionProps) => {
  return (
    <Accordion {...props}>
      <AccordionItem itemKey='1' title='Accordion 1'>
        {Text}
      </AccordionItem>
      <AccordionItem itemKey='2' title='Accordion 2'>
        {Text}
      </AccordionItem>
      <AccordionItem itemKey='3' title='Accordion 3'>
        {Text}
      </AccordionItem>
    </Accordion>
  )
}

const variants = ['outlined', 'underlined'] as const

const meta = {
  title: 'Components/Accordion',
  component: Accordion<'div'>,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
    hideIndicator: {
      control: 'boolean',
    },
    keepMounted: {
      control: 'boolean',
    },
    variant: {
      options: variants,
      control: 'select',
    },
    animateDisabled: {
      control: 'boolean',
    },
  },
  render: (props) => <AccordionTemplate {...props} />,
} satisfies Meta<typeof Accordion<'div'>>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Multiple: Story = {
  args: {
    multiple: true,
    defaultExpandedKeys: ['1', '2'],
  },
}

export const KeepMounted: Story = {
  args: {
    keepMounted: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DefaultExpanded: Story = {
  args: {
    defaultExpandedKeys: ['1'],
  },
}

export const DisabledKeys: Story = {
  args: {
    disabledKeys: ['1'],
  },
}

export const hideIndicator: Story = {
  args: {
    hideIndicator: true,
  },
}

export const Variants: Story = {
  render: (props) => (
    <Flex direction='column' gap='6'>
      {variants.map((variant) => (
        <AccordionTemplate
          key={variant}
          {...props}
          variant={variant}
          defaultExpandedKeys={['1']}
        />
      ))}
    </Flex>
  ),
}

export const Controlled: Story = {
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expandedKeys, setExpandedKeys] = useState<Key[]>(['1'])
    return (
      <>
        <AccordionTemplate
          expandedKeys={expandedKeys}
          onExpandedKeysChange={setExpandedKeys}
          {...props}
        />
        <p>
          Current Expanded Keys:
          {expandedKeys.length > 0 ? expandedKeys.join(', ') : 'None'}
        </p>
      </>
    )
  },
}
