'use client'

import { Accordion, AccordionItem } from '@nex-ui/react'

export default function App() {
  return (
    <Accordion
      motionProps={{
        variants: {
          visible: {
            translateY: 0,
          },
          hidden: {
            translateY: -10,
          },
        },
        transition: {
          translateY: {
            duration: 0.2,
            delay: 0.1,
            ease: 'easeInOut',
          },
        },
      }}
    >
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
}
