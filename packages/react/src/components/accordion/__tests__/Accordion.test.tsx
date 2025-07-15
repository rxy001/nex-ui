import { createRef, useState } from 'react'
import { fireEvent, act } from '@testing-library/react'
import {
  renderWithNexUIProvider,
  mountTest,
  rootClassNameTest,
} from '~/tests/shared'
import { Accordion, AccordionItem } from '../index'
import { Button } from '../../button'
import { accordionClasses, accordionItemClasses } from '../accordionClasses'
import type { Key } from 'react'

const children = (
  <AccordionItem itemKey='1' title='Accordion 1' data-testid='accordion-item'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    malesuada lacus ex, sit amet blandit leo lobortis eget.
  </AccordionItem>
)

describe('Accordion', () => {
  mountTest(<Accordion>{children}</Accordion>, {
    useAct: true,
  })

  rootClassNameTest(<Accordion className='test-class' />, 'test-class', {
    useAct: true,
  })

  it('renders correctly', async () => {
    const { container } = await renderWithNexUIProvider(
      <Accordion>{children}</Accordion>,
      {
        useAct: true,
      },
    )
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it("should forward ref to Accordion's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { container } = await renderWithNexUIProvider(
      <Accordion ref={ref} data-testid='accordion'>
        {children}
      </Accordion>,
      {
        useAct: true,
      },
    )
    const accordionElement = container.firstElementChild
    expect(ref.current).toBe(accordionElement)
  })

  it("should forward ref to AccordionItem's root element", async () => {
    const ref = createRef<HTMLDivElement>()
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion>
        <AccordionItem
          ref={ref}
          itemKey='1'
          title='Accordion 1'
          data-testid='accordion-item'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionItem>
      </Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItemElement = getByTestId('accordion-item')
    expect(ref.current).toBe(accordionItemElement)
  })

  it('should forward slotProps to heading, indicator, trigger and content slots', async () => {
    const slotProps = {
      heading: { className: 'test-heading' },
      indicator: { className: 'test-indicator' },
      trigger: { className: 'test-trigger' },
      content: { className: 'test-content' },
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion>
        <AccordionItem
          itemKey='1'
          title='Accordion 1'
          slotProps={slotProps}
          data-testid='accordion-item'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionItem>
      </Accordion>,
      {
        useAct: true,
      },
    )

    const root = getByTestId('accordion-item')

    expect(root.querySelector(`.${accordionItemClasses.heading}`)).toHaveClass(
      slotProps.heading.className,
    )
    expect(
      root.querySelector(`.${accordionItemClasses.indicator}`),
    ).toHaveClass(slotProps.indicator.className)
    expect(root.querySelector(`.${accordionItemClasses.trigger}`)).toHaveClass(
      slotProps.trigger.className,
    )
    expect(root.querySelector(`.${accordionItemClasses.content}`)).toHaveClass(
      slotProps.content.className,
    )
  })

  it('should forward classes to heading, indicator, trigger and content slots', async () => {
    const classes = {
      heading: 'test-heading',
      indicator: 'test-indicator',
      trigger: 'test-trigger',
      content: 'test-content',
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion>
        <AccordionItem
          itemKey='1'
          title='Accordion 1'
          classes={classes}
          data-testid='accordion-item'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionItem>
      </Accordion>,
      {
        useAct: true,
      },
    )
    const root = getByTestId('accordion-item')
    expect(root.querySelector(`.${classes.heading}`)).toBeInTheDocument()
    expect(root.querySelector(`.${classes.indicator}`)).toBeInTheDocument()
    expect(root.querySelector(`.${classes.trigger}`)).toBeInTheDocument()
    expect(root.querySelector(`.${classes.content}`)).toBeInTheDocument()
  })

  it('should have correct class names', async () => {
    const { container, getByTestId, rerender } = await renderWithNexUIProvider(
      <Accordion expandedKeys={['1']}>{children}</Accordion>,
      {
        useAct: true,
      },
    )
    const accordionRoot = container.firstElementChild
    expect(accordionRoot).toHaveClass(accordionClasses.root)
    expect(accordionRoot).toHaveClass(accordionClasses['variant-underlined'])

    rerender(
      <Accordion expandedKeys={['1']} variant='outlined'>
        {children}
      </Accordion>,
    )
    expect(accordionRoot).toHaveClass(accordionClasses['variant-outlined'])

    rerender(<Accordion expandedKeys={['1']}>{children}</Accordion>)
    const accordionItem = getByTestId('accordion-item')
    expect(accordionItem).toHaveClass(accordionItemClasses.root)
    expect(accordionItem).not.toHaveClass(accordionItemClasses.disabled)
    expect(accordionItem).toHaveClass(accordionItemClasses.expanded)
    expect(
      accordionItem.querySelector(`.${accordionItemClasses.trigger}`),
    ).toBeInTheDocument()
    expect(
      accordionItem.querySelector(`.${accordionItemClasses.heading}`),
    ).toBeInTheDocument()
    expect(
      accordionItem.querySelector(`.${accordionItemClasses.content}`),
    ).toBeInTheDocument()
    expect(
      accordionItem.querySelector(`.${accordionItemClasses.indicator}`),
    ).toBeInTheDocument()
  })

  it('should add the appropriate variant class to root element based on variant prop', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <>
        <Accordion variant='outlined' data-testid='variant-outlined'>
          Button
        </Accordion>
        <Accordion variant='underlined' data-testid='variant-underlined'>
          Button
        </Accordion>
      </>,
      {
        useAct: true,
      },
    )

    const outlinedAccordion = getByTestId('variant-outlined')
    const underlinedAccordion = getByTestId('variant-underlined')

    expect(outlinedAccordion).toHaveClass(accordionClasses['variant-outlined'])
    expect(underlinedAccordion).toHaveClass(
      accordionClasses['variant-underlined'],
    )
  })

  it('should handle defaultExpandedKeys prop', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion defaultExpandedKeys={['1']}>{children}</Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItem = getByTestId('accordion-item')
    expect(accordionItem).toHaveClass(accordionItemClasses.expanded)
  })

  it('should be controlled by expandedKeys prop', async () => {
    function ControlledAccordion() {
      const [expandedKeys, setExpandedKeys] = useState<Key[]>([])

      return (
        <>
          <Accordion
            expandedKeys={expandedKeys}
            onExpandedKeysChange={setExpandedKeys}
          >
            <AccordionItem
              itemKey='1'
              title='Accordion 1'
              data-testid='accordion-item'
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </AccordionItem>
          </Accordion>
          <Button data-testid='button' onClick={() => setExpandedKeys(['1'])}>
            Open Accordion 1
          </Button>
        </>
      )
    }

    const { getByTestId } = await renderWithNexUIProvider(
      <ControlledAccordion />,
      {
        useAct: true,
      },
    )
    const accordionItem = getByTestId('accordion-item')
    expect(accordionItem).not.toHaveClass(accordionItemClasses.expanded)

    const button = getByTestId('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(accordionItem).toHaveClass(accordionItemClasses.expanded)
  })

  it('should always render the AccordionItem content when keepMounted is true', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <Accordion keepMounted expandedKeys={['1']}>
        {children}
      </Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItem = getByTestId('accordion-item')
    expect(accordionItem).toBeInTheDocument()

    rerender(
      <Accordion keepMounted expandedKeys={[]}>
        {children}
      </Accordion>,
    )
    expect(accordionItem).toBeInTheDocument()
  })

  it('should unmount AccordionItem content when collapsed and keepMounted is false', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <Accordion keepMounted={false} expandedKeys={['1']}>
        {children}
      </Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItem = getByTestId('accordion-item')
    expect(
      accordionItem.querySelector(`.${accordionItemClasses.content}`),
    ).toBeInTheDocument()

    rerender(
      <Accordion keepMounted={false} expandedKeys={[]}>
        {children}
      </Accordion>,
    )
    expect(
      accordionItem.querySelector(`.${accordionItemClasses.content}`),
    ).not.toBeInTheDocument()
  })

  it('should handle multiple prop correctly', async () => {
    const arrayChildren = [
      <AccordionItem key='1' itemKey='1' title='Accordion 1'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionItem>,
      <AccordionItem key='2' itemKey='2' title='Accordion 2'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionItem>,
      <AccordionItem key='3' itemKey='3' title='Accordion 3'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </AccordionItem>,
    ]
    const { rerender, container } = await renderWithNexUIProvider(
      <Accordion multiple expandedKeys={['1']}>
        {arrayChildren}
      </Accordion>,
      {
        useAct: true,
      },
    )
    const root = container.firstElementChild

    expect(
      root?.querySelectorAll(`.${accordionItemClasses.expanded}`),
    ).toHaveLength(1)

    rerender(
      <Accordion multiple expandedKeys={['1', '2']}>
        {arrayChildren}
      </Accordion>,
    )
    expect(
      root?.querySelectorAll(`.${accordionItemClasses.expanded}`),
    ).toHaveLength(2)
  })

  it('should handle disabled prop correctly', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion disabled={true}>
        <AccordionItem
          itemKey='1'
          title='Accordion 1'
          data-testid='accordion-item-1'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionItem>
        <AccordionItem
          itemKey='2'
          title='Accordion 2'
          data-testid='accordion-item-2'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionItem>
      </Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItem1 = getByTestId('accordion-item-1')
    expect(accordionItem1).toHaveClass(accordionItemClasses.disabled)

    const accordionItem2 = getByTestId('accordion-item-2')
    expect(accordionItem2).toHaveClass(accordionItemClasses.disabled)
  })

  it('should hide indicator when hideIndicator is true', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion hideIndicator={true}>{children}</Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItem = getByTestId('accordion-item')
    expect(
      accordionItem.querySelector(`.${accordionItemClasses.indicator}`),
    ).not.toBeInTheDocument()
  })

  it('should customize indicator', async () => {
    const customIndicator = <span data-testid='custom-indicator'>▼</span>
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion indicator={customIndicator}>{children}</Accordion>,
      {
        useAct: true,
      },
    )

    const indicator = getByTestId('custom-indicator')
    expect(indicator).toBeInTheDocument()
  })

  it('should call onExpandedKeysChange when expanded keys change', async () => {
    const onExpandedKeysChange = jest.fn()
    const { getByRole } = await renderWithNexUIProvider(
      <Accordion onExpandedKeysChange={onExpandedKeysChange}>
        {children}
      </Accordion>,
      {
        useAct: true,
      },
    )
    expect(onExpandedKeysChange).not.toHaveBeenCalled()

    const trigger = getByRole('button')
    fireEvent.click(trigger)
    expect(onExpandedKeysChange).toHaveBeenCalled()
  })

  it('should warn when multiple is false and expandedKeys has more than one key', async () => {
    const consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    await renderWithNexUIProvider(
      <Accordion multiple={false} expandedKeys={['1', '2']}>
        {children}
      </Accordion>,
      {
        useAct: true,
      },
    )

    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockRestore()
  })

  it('should toggle between expanded and collapsed states when clicking the trigger', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion defaultExpandedKeys={['1']} multiple>
        <AccordionItem
          key='1'
          itemKey='1'
          title='Accordion 1'
          data-testid='accordion-item-1'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionItem>
        <AccordionItem
          key='2'
          itemKey='2'
          title='Accordion 2'
          data-testid='accordion-item-2'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionItem>
      </Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItem1 = getByTestId('accordion-item-1')
    expect(accordionItem1).toHaveClass(accordionItemClasses.expanded)
    const trigger1 = accordionItem1.querySelector(
      `.${accordionItemClasses.trigger}`,
    )
    fireEvent.click(trigger1!)
    expect(accordionItem1).not.toHaveClass(accordionItemClasses.expanded)

    const accordionItem2 = getByTestId('accordion-item-2')
    expect(accordionItem2).not.toHaveClass(accordionItemClasses.expanded)
    const trigger2 = accordionItem2.querySelector(
      `.${accordionItemClasses.trigger}`,
    )
    fireEvent.click(trigger2!)
    expect(accordionItem2).toHaveClass(accordionItemClasses.expanded)

    fireEvent.click(trigger2!)
    expect(accordionItem2).not.toHaveClass(accordionItemClasses.expanded)
  })
})
