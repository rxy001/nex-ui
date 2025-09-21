import { createRef } from 'react'
import { fireEvent, act, waitFor } from '@testing-library/react'
import { renderWithNexUIProvider } from '~/tests/shared'
import { Accordion, AccordionItem } from '../index'
import { accordionItemSlotClasses, accordionItemDataAttrs } from './constants'
import type { AccordionItemProps } from '../index'

const TestAccordionItem = (props: AccordionItemProps) => (
  <AccordionItem
    itemKey='1'
    title='Accordion 1'
    data-testid='accordion-item'
    {...props}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    malesuada lacus ex, sit amet blandit leo lobortis eget.
  </AccordionItem>
)

describe('AccordionItem', () => {
  it("should forward ref to AccordionItem's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion>
        <TestAccordionItem ref={ref} />
      </Accordion>,
      {
        useAct: true,
      },
    )
    expect(getByTestId('accordion-item')).toBe(ref.current)
  })

  it('should forward slotProps to heading, indicator, trigger and content slots', async () => {
    const slotProps = {
      heading: { className: 'test-heading' },
      indicator: { className: 'test-indicator' },
      trigger: { className: 'test-trigger' },
      content: { className: 'test-content' },
    }
    const { queryByClassName } = await renderWithNexUIProvider(
      <Accordion expandedKeys={['1']}>
        <TestAccordionItem slotProps={slotProps} />
      </Accordion>,
      {
        useAct: true,
      },
    )

    expect(queryByClassName(accordionItemSlotClasses.heading)).toHaveClass(
      slotProps.heading.className,
    )
    expect(queryByClassName(accordionItemSlotClasses.indicator)).toHaveClass(
      slotProps.indicator.className,
    )
    expect(queryByClassName(accordionItemSlotClasses.trigger)).toHaveClass(
      slotProps.trigger.className,
    )
    expect(queryByClassName(accordionItemSlotClasses.content)).toHaveClass(
      slotProps.content.className,
    )
  })

  it('should forward classNames to heading, indicator, trigger and content slots', async () => {
    const classNames = {
      heading: 'test-heading',
      indicator: 'test-indicator',
      trigger: 'test-trigger',
      content: 'test-content',
    }
    const { queryByClassName } = await renderWithNexUIProvider(
      <Accordion expandedKeys={['1']}>
        <TestAccordionItem classNames={classNames} />
      </Accordion>,
      {
        useAct: true,
      },
    )

    expect(queryByClassName(classNames.heading)).toBeInTheDocument()
    expect(queryByClassName(classNames.indicator)).toBeInTheDocument()
    expect(queryByClassName(classNames.trigger)).toBeInTheDocument()
    expect(queryByClassName(classNames.content)).toBeInTheDocument()
  })

  it('should have default itemKey on AccordionItem', async () => {
    const { getByTestId, getByRole } = await renderWithNexUIProvider(
      <Accordion>
        <AccordionItem title='Accordion 1' data-testid='accordion-item'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionItem>
      </Accordion>,
      {
        useAct: true,
      },
    )

    const accordionItemRoot = getByTestId('accordion-item')
    const trigger = getByRole('button')

    await act(async () => {
      fireEvent.click(trigger)
    })

    expect(accordionItemRoot).toHaveAttribute(
      ...accordionItemDataAttrs['state-expanded'],
    )
  })

  it('should always render the AccordionItem content when keepMounted=true', async () => {
    const { rerender, queryByClassName } = await renderWithNexUIProvider(
      <Accordion keepMounted expandedKeys={['1']}>
        <TestAccordionItem />
      </Accordion>,
      {
        useAct: true,
      },
    )

    const content = queryByClassName(accordionItemSlotClasses.content)
    const root = queryByClassName(accordionItemSlotClasses.root)

    expect(content).toBeInTheDocument()
    expect(root).toHaveAttribute(...accordionItemDataAttrs['keepMounted-true'])

    await act(async () => {
      rerender(
        <Accordion keepMounted expandedKeys={[]}>
          <TestAccordionItem />
        </Accordion>,
      )
    })
    expect(content).toBeInTheDocument()
  })

  it('should unmount AccordionItem content when collapsed and keepMounted=false', async () => {
    const { rerender, queryByClassName } = await renderWithNexUIProvider(
      <Accordion keepMounted={false} expandedKeys={['1']}>
        <TestAccordionItem />
      </Accordion>,
      {
        useAct: true,
      },
    )

    const content = queryByClassName(accordionItemSlotClasses.content)
    const root = queryByClassName(accordionItemSlotClasses.root)
    expect(content).toBeInTheDocument()
    expect(root).toHaveAttribute(...accordionItemDataAttrs['keepMounted-false'])

    await act(async () => {
      rerender(
        <Accordion keepMounted={false} expandedKeys={[]}>
          <TestAccordionItem />
        </Accordion>,
      )
    })

    await waitFor(() => {
      expect(
        queryByClassName(accordionItemSlotClasses.content),
      ).not.toBeInTheDocument()
    })
  })

  it('should toggle between expanded and collapsed states when clicking the trigger', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion defaultExpandedKeys={['1']} multiple>
        <TestAccordionItem key='1' itemKey='1' data-testid='accordion-item-1' />
        <TestAccordionItem key='2' itemKey='2' data-testid='accordion-item-2' />
      </Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItemRoot1 = getByTestId('accordion-item-1')
    expect(accordionItemRoot1).toHaveAttribute(
      ...accordionItemDataAttrs['state-expanded'],
    )
    const trigger1 = accordionItemRoot1.querySelector(
      `.${accordionItemSlotClasses.trigger}`,
    )
    await act(async () => {
      fireEvent.click(trigger1!)
    })
    expect(accordionItemRoot1).toHaveAttribute(
      ...accordionItemDataAttrs['state-collapsed'],
    )

    const accordionItemRoot2 = getByTestId('accordion-item-2')
    expect(accordionItemRoot2).toHaveAttribute(
      ...accordionItemDataAttrs['state-collapsed'],
    )
    const trigger2 = accordionItemRoot2.querySelector(
      `.${accordionItemSlotClasses.trigger}`,
    )
    await act(async () => {
      fireEvent.click(trigger2!)
    })
    expect(accordionItemRoot2).toHaveAttribute(
      ...accordionItemDataAttrs['state-expanded'],
    )

    await act(async () => {
      fireEvent.click(trigger2!)
    })
    expect(accordionItemRoot2).toHaveAttribute(
      ...accordionItemDataAttrs['state-collapsed'],
    )
  })

  it('should hide indicator when hideIndicator=true', async () => {
    const { getByTestId, queryByClassName } = await renderWithNexUIProvider(
      <Accordion>
        <TestAccordionItem hideIndicator={true} />
      </Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItem = getByTestId('accordion-item')
    const indicator = queryByClassName(accordionItemSlotClasses.indicator)

    expect(accordionItem).toHaveAttribute(
      ...accordionItemDataAttrs['hideIndicator-true'],
    )
    expect(indicator).not.toBeInTheDocument()
  })

  it('should customize indicator', async () => {
    const customIndicator = <span data-testid='custom-item-indicator'>→</span>
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion>
        <TestAccordionItem indicator={customIndicator} />
      </Accordion>,
      {
        useAct: true,
      },
    )

    expect(getByTestId('custom-item-indicator')).toBeInTheDocument()
  })

  it('should apply custom motionProps to content animation', async () => {
    const customMotionProps = {
      'data-testid': 'item-motion-content',
      style: { backgroundColor: 'blue' },
    }

    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion expandedKeys={['1']}>
        <TestAccordionItem motionProps={customMotionProps} />
      </Accordion>,
      {
        useAct: true,
      },
    )

    const motionContent = getByTestId('item-motion-content')
    expect(motionContent).toBeInTheDocument()
    expect(motionContent).toHaveStyle('background-color: blue')
  })

  it('should apply custom indicatorMotionProps to indicator animation', async () => {
    const customIndicatorMotionProps = {
      'data-testid': 'item-motion-indicator',
      transition: { duration: 1 },
    }

    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion>
        <TestAccordionItem indicatorMotionProps={customIndicatorMotionProps} />
      </Accordion>,
      {
        useAct: true,
      },
    )

    const motionIndicator = getByTestId('item-motion-indicator')
    expect(motionIndicator).toBeInTheDocument()
  })

  describe('Accessibility', () => {
    it('should have role="button", aria-expanded and aria-controls in AccordionItem heading', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Accordion keepMounted>
          <TestAccordionItem />
        </Accordion>,
        {
          useAct: true,
        },
      )

      const trigger = getByRole('button')
      const content = getByRole('region')

      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(trigger).toHaveAttribute('aria-controls', content.id)
    })

    it('should have aria-labelledby and role="region" in AccordionItem content', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Accordion keepMounted>
          <TestAccordionItem />
        </Accordion>,
        {
          useAct: true,
        },
      )

      const content = getByRole('region')
      const trigger = getByRole('button')

      expect(content).toHaveAttribute('aria-labelledby', trigger.id)
    })

    it('should toggle aria-expanded attribute on trigger when clicked', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Accordion>
          <TestAccordionItem />
        </Accordion>,
        {
          useAct: true,
        },
      )

      const trigger = getByRole('button')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      await act(async () => {
        fireEvent.click(trigger)
      })
      expect(trigger).toHaveAttribute('aria-expanded', 'true')

      await act(async () => {
        fireEvent.click(trigger)
      })
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it('should AccordionItem title be contained within a role="heading" element', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Accordion>
          <TestAccordionItem />
        </Accordion>,
        {
          useAct: true,
        },
      )

      const heading = getByRole('heading', { name: 'Accordion 1' })
      expect(heading.tagName).toBe('H3')
    })

    it('should apply disabled attribute to AccordionItem button when disabled=true', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Accordion disabled>
          <TestAccordionItem />
        </Accordion>,
        {
          useAct: true,
        },
      )

      const trigger = getByRole('button')
      expect(trigger).toBeDisabled()
      expect(trigger).toHaveAttribute('tabIndex', '-1')
    })

    it("should toggle expansion on Enter/Space when header's trigger is focused", async () => {
      const { getByRole, user } = await renderWithNexUIProvider(
        <Accordion>
          <TestAccordionItem />
        </Accordion>,
        {
          useAct: true,
        },
      )

      const trigger = getByRole('button')
      await user.tab()
      expect(document.activeElement).toBe(trigger)
      await user.keyboard('{Enter}')
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await user.keyboard('{Enter}')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      await user.keyboard(' ')
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await user.keyboard(' ')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it("should focus the header's trigger of AccordionItem when Tab or Shift+Tab is pressed", async () => {
      const { getAllByRole, user } = await renderWithNexUIProvider(
        <Accordion>
          <TestAccordionItem itemKey='1' />
          <TestAccordionItem itemKey='2' />
          <TestAccordionItem itemKey='3' />
        </Accordion>,
        {
          useAct: true,
        },
      )

      const triggers = getAllByRole('button')

      await user.tab()
      expect(document.activeElement).toBe(triggers[0])
      await user.tab()
      expect(document.activeElement).toBe(triggers[1])
      await user.tab()
      expect(document.activeElement).toBe(triggers[2])

      await user.tab({ shift: true })
      expect(document.activeElement).toBe(triggers[1])
      await user.tab({ shift: true })
      expect(document.activeElement).toBe(triggers[0])
    })
  })
})
