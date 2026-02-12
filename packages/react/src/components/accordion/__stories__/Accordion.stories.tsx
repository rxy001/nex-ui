import { useState } from 'react'
import { upperFirst } from '@nex-ui/utils'
import { WithLabel } from '~/sb/utils'
import { Accordion } from '../Accordion'
import { AccordionItem } from '../AccordionItem'
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

const VARIANTS = ['outlined', 'underlined'] as const

const meta = {
  title: 'Components/Accordion',
  component: AccordionTemplate,
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
      options: VARIANTS,
      control: 'select',
    },
    disableAnimation: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AccordionTemplate>

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
    defaultExpandedKeys: ['1'],
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

export const WithoutIndicator: Story = {
  args: {
    hideIndicator: true,
  },
}

export const DisableAnimation: Story = {
  args: {
    disableAnimation: true,
    defaultExpandedKeys: ['1'],
  },
}

export const Variants = (props: AccordionProps) =>
  VARIANTS.map((variant) => (
    <WithLabel key={variant} label={`${upperFirst(variant)}Variant`}>
      <AccordionTemplate
        {...props}
        variant={variant}
        defaultExpandedKeys={['1']}
      />
    </WithLabel>
  ))

export const CustomIndicator: Story = {
  args: {
    indicator: '👇',
    defaultExpandedKeys: ['1'],
  },
}

export function Controlled(props: AccordionProps) {
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(['1'])

  return (
    <>
      <AccordionTemplate
        {...props}
        expandedKeys={expandedKeys}
        onExpandedKeysChange={setExpandedKeys}
      />
      <p>
        Current Expanded Keys:
        {expandedKeys.length > 0 ? expandedKeys.join(', ') : 'None'}
      </p>
    </>
  )
}

export const Chromatic: Story = {
  render: () => (
    <>
      <WithLabel label='SingleOpen'>
        <AccordionTemplate defaultExpandedKeys={['1']} />
      </WithLabel>
      <WithLabel label='MultipleOpen'>
        <AccordionTemplate {...Multiple.args} />
      </WithLabel>
      <WithLabel label='KeepMounted'>
        <AccordionTemplate {...KeepMounted.args} />
      </WithLabel>
      <WithLabel label='Disabled'>
        <AccordionTemplate {...Disabled.args} />
      </WithLabel>
      <WithLabel label='DisabledKeys'>
        <AccordionTemplate {...DisabledKeys.args} />
      </WithLabel>
      <WithLabel label='WithoutIndicator'>
        <AccordionTemplate {...WithoutIndicator.args} />
      </WithLabel>
      <WithLabel label='DisableAnimation'>
        <AccordionTemplate {...DisableAnimation.args} />
      </WithLabel>
      <WithLabel label='CustomIndicator'>
        <AccordionTemplate {...CustomIndicator.args} />
      </WithLabel>
      <Variants defaultExpandedKeys={['1']} />
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
