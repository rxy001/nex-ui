import { useState } from 'react'
import { upperFirst } from '@nex-ui/utils'
import { withLabel } from '~/sb/utils'
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

const renderVariants = (props?: AccordionProps) => (
  <>
    {VARIANTS.map((variant) =>
      withLabel(`${upperFirst(variant)}Variant`)(
        <AccordionTemplate
          key={variant}
          {...props}
          variant={variant}
          defaultExpandedKeys={['1']}
        />,
      ),
    )}
  </>
)

export const Variants: Story = {
  render: renderVariants,
}

export const CustomIndicator: Story = {
  args: {
    indicator: '👇',
    defaultExpandedKeys: ['1'],
  },
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

export const Chromatic: Story = {
  render: () => (
    <>
      {withLabel('SingleOpen')(
        <AccordionTemplate defaultExpandedKeys={['1']} />,
      )}
      {withLabel('MultipleOpen')(<AccordionTemplate {...Multiple.args} />)}
      {withLabel('KeepMounted')(<AccordionTemplate {...KeepMounted.args} />)}
      {withLabel('Disabled')(<AccordionTemplate {...Disabled.args} />)}
      {withLabel('DisabledKeys')(<AccordionTemplate {...DisabledKeys.args} />)}
      {withLabel('WithoutIndicator')(
        <AccordionTemplate {...WithoutIndicator.args} />,
      )}
      {withLabel('DisableAnimation')(
        <AccordionTemplate {...DisableAnimation.args} />,
      )}
      {withLabel('CustomIndicator')(
        <AccordionTemplate {...CustomIndicator.args} />,
      )}
      {renderVariants()}
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
