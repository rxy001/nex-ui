import { Accordion, AccordionItem } from '@nex-ui/react'
import { ChevronLeftOutlined } from '@nex-ui/icons'

export default function App() {
  return (
    <Accordion
      indicator={<ChevronLeftOutlined />}
      indicatorMotionProps={{
        variants: {
          expanded: {
            rotate: -90,
            transition: {
              duration: 0.2,
            },
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
