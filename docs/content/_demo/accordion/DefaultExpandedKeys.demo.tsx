import { Accordion, AccordionItem } from '@nex-ui/react'

export default function App() {
  return (
    <Accordion defaultExpandedKeys={['3']}>
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
