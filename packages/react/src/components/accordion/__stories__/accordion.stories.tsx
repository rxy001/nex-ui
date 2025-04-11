import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from '../Accordion'
import { AccordionItem } from '../AccordionItem'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {},
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const BasicAccordion: Story = {
  render: () => {
    return (
      <Accordion>
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
}
