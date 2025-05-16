'use client'

import { Accordion, AccordionItem } from '@nex-ui/react'
import { useState } from 'react'
import type { Key } from 'react'

export default function App() {
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([])

  return (
    <Accordion
      expandedKeys={expandedKeys}
      onExpandedKeysChange={setExpandedKeys}
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
