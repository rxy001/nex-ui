import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from '../Accordion'
import { AccordionItem } from '../AccordionItem'
import { Flex } from '../../flex'
import { Button } from '../../button'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
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
      options: ['underlined', 'outlined'],
      control: 'select',
    },
  },
  args: {
    disabled: false,
    multiple: false,
    hideIndicator: false,
    keepMounted: true,
    variant: 'underlined',
  },
  render: (props) => {
    return (
      <Accordion {...props}>
        <AccordionItem itemKey='1' title='Accordion 1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionItem>
        <AccordionItem itemKey='2' title='Accordion 2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionItem>
        <AccordionItem itemKey='3' title='Accordion 3'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionItem>
      </Accordion>
    )
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Multiple: Story = {
  args: {
    multiple: true,
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

export const Controlled: Story = {
  render: (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [expandedKeys, setExpandedKeys] = useState<string[]>([])
    return (
      <>
        <Accordion expandedKeys={expandedKeys} {...props}>
          <AccordionItem itemKey='1' title='Accordion 1'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionItem>
          <AccordionItem itemKey='2' title='Accordion 2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionItem>
          <AccordionItem itemKey='3' title='Accordion 3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionItem>
        </Accordion>
        <Flex sx={{ mt: '5' }} gap='4'>
          <Button
            onClick={() => {
              setExpandedKeys(['1'])
            }}
          >
            Open1
          </Button>
          <Button
            onClick={() => {
              setExpandedKeys(['2'])
            }}
          >
            Open2
          </Button>
          <Button
            onClick={() => {
              setExpandedKeys(['3'])
            }}
          >
            Open3
          </Button>
        </Flex>
      </>
    )
  },
}
