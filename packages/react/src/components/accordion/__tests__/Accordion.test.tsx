import { useState } from 'react'
import { fireEvent, act } from '@testing-library/react'
import {
  renderWithNexUIProvider,
  testComponentStability,
  testRefForwarding,
  testRootClassName,
  testVariantDataAttrs,
} from '~/tests/shared'
import { Accordion, AccordionItem } from '../index'
import { Button } from '../../button'
import { accordionSlotClasses, accordionItemSlotClasses } from './classes'
import type { Key } from 'react'
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

describe('Accordion', () => {
  testComponentStability(
    <Accordion>
      <TestAccordionItem />
    </Accordion>,
    {
      useAct: true,
    },
  )

  testRootClassName(<Accordion />, {
    useAct: true,
  })

  testVariantDataAttrs(
    <Accordion>
      <TestAccordionItem />
    </Accordion>,
    ['variant', ['outlined', 'underlined']],
    {
      useAct: true,
    },
  )

  testRefForwarding(
    <Accordion>
      <TestAccordionItem />
    </Accordion>,
    {
      useAct: true,
    },
  )

  testVariantDataAttrs(
    <Accordion>
      <TestAccordionItem />
    </Accordion>,
    ['multiple', [true, false]],
    {
      useAct: true,
    },
  )

  testVariantDataAttrs(
    <Accordion>
      <TestAccordionItem />
    </Accordion>,
    ['variant', ['outlined', 'underlined']],
    {
      useAct: true,
    },
  )

  it('should render with default props', async () => {
    const { container } = await renderWithNexUIProvider(
      <Accordion>
        <TestAccordionItem />
      </Accordion>,
      {
        useAct: true,
      },
    )
    const accordionRoot = container.firstElementChild

    expect(accordionRoot).toMatchSnapshot()

    expect(accordionRoot).toHaveClass(accordionSlotClasses.root)

    expect(accordionRoot).toHaveAttribute('data-variant', 'underlined')
    expect(accordionRoot).toHaveAttribute('data-multiple', 'false')
  })

  it('should render expanded items when defaultExpandedKeys is provided', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion defaultExpandedKeys={['1']}>
        <TestAccordionItem />
      </Accordion>,
      {
        useAct: true,
      },
    )
    expect(getByTestId('accordion-item')).toHaveAttribute(
      'data-state',
      'expanded',
    )
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
            <TestAccordionItem />
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
    const accordionItemRoot = getByTestId('accordion-item')
    expect(accordionItemRoot).toHaveAttribute('data-state', 'collapsed')

    const button = getByTestId('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(accordionItemRoot).toHaveAttribute('data-state', 'expanded')
  })

  it('should render multiple expanded AccordionItems when multiple=true', async () => {
    const arrayChildren = [
      <TestAccordionItem key='1' itemKey='1' />,
      <TestAccordionItem key='2' itemKey='2' />,
      <TestAccordionItem key='3' itemKey='3' />,
    ]
    const { rerender, queryAllByClassName } = await renderWithNexUIProvider(
      <Accordion multiple expandedKeys={['1']}>
        {arrayChildren}
      </Accordion>,
      {
        useAct: true,
      },
    )

    const selector = `${accordionItemSlotClasses['root']}[data-state="expanded"]`
    expect(queryAllByClassName(selector)).toHaveLength(1)

    await act(async () => {
      rerender(
        <Accordion multiple expandedKeys={['1', '2']}>
          {arrayChildren}
        </Accordion>,
      )
    })
    expect(queryAllByClassName(selector)).toHaveLength(2)
  })

  it('should be non-interactive AccordionItem when disabled=true', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion disabled={true}>
        <TestAccordionItem itemKey='1' data-testid='accordion-item-1' />
        <TestAccordionItem itemKey='2' data-testid='accordion-item-2' />
      </Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItemRoot1 = getByTestId('accordion-item-1')
    expect(accordionItemRoot1).toHaveStyleRule('pointer-events', 'none')

    const accordionItemRoot2 = getByTestId('accordion-item-2')
    expect(accordionItemRoot2).toHaveStyleRule('pointer-events', 'none')
  })

  it('should hide indicator when hideIndicator=true', async () => {
    const { queryByClassName } = await renderWithNexUIProvider(
      <Accordion hideIndicator={true}>
        <TestAccordionItem />
      </Accordion>,
      {
        useAct: true,
      },
    )

    const indicator = queryByClassName(accordionItemSlotClasses.indicator)
    expect(indicator).not.toBeInTheDocument()
  })

  it('should customize indicator', async () => {
    const customIndicator = <span data-testid='custom-indicator'>▼</span>
    const { queryByTestId } = await renderWithNexUIProvider(
      <Accordion indicator={customIndicator}>
        <TestAccordionItem />
      </Accordion>,
      {
        useAct: true,
      },
    )

    expect(queryByTestId('custom-indicator')).toBeInTheDocument()
  })

  it('should call onExpandedKeysChange when expanded keys change', async () => {
    const onExpandedKeysChange = jest.fn()
    const { getByRole } = await renderWithNexUIProvider(
      <Accordion onExpandedKeysChange={onExpandedKeysChange}>
        <TestAccordionItem />
      </Accordion>,
      {
        useAct: true,
      },
    )
    expect(onExpandedKeysChange).not.toHaveBeenCalled()

    const trigger = getByRole('button')
    await act(async () => {
      fireEvent.click(trigger)
    })
    expect(onExpandedKeysChange).toHaveBeenCalled()
  })

  it('should warn when multiple=false and expandedKeys has more than one key', async () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

    await renderWithNexUIProvider(
      <Accordion multiple={false} expandedKeys={['1', '2']}>
        <TestAccordionItem />
      </Accordion>,
      {
        useAct: true,
      },
    )

    expect(consoleWarnSpy).toHaveBeenCalled()

    consoleWarnSpy.mockRestore()
  })

  it('should handle disabledKeys prop to disable specific items', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion disabledKeys={['1']}>
        <TestAccordionItem itemKey='1' data-testid='accordion-item-1' />
        <TestAccordionItem itemKey='2' data-testid='accordion-item-2' />
      </Accordion>,
      {
        useAct: true,
      },
    )

    const accordionItem1 = getByTestId('accordion-item-1')
    const accordionItem2 = getByTestId('accordion-item-2')

    expect(accordionItem1).toHaveAttribute('data-disabled', 'true')
    expect(accordionItem2).toHaveAttribute('data-disabled', 'false')
  })

  it('should apply custom motionProps to content animation', async () => {
    const customMotionProps = {
      'data-testid': 'motion-content',
      style: { background: 'red' },
    }

    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion motionProps={customMotionProps} expandedKeys={['1']}>
        <TestAccordionItem />
      </Accordion>,
      {
        useAct: true,
      },
    )

    const motionContent = getByTestId('motion-content')
    expect(motionContent).toBeInTheDocument()
    expect(motionContent).toHaveStyle('background: red')
  })

  it('should apply custom indicatorMotionProps to indicator animation', async () => {
    const customIndicatorMotionProps = {
      'data-testid': 'motion-indicator',
      transition: { duration: 0.5 },
    }

    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion indicatorMotionProps={customIndicatorMotionProps}>
        <TestAccordionItem />
      </Accordion>,
      {
        useAct: true,
      },
    )

    const motionIndicator = getByTestId('motion-indicator')
    expect(motionIndicator).toBeInTheDocument()
  })

  it('should handle single mode correctly when multiple=false', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion multiple={false} defaultExpandedKeys={['1']}>
        <TestAccordionItem itemKey='1' data-testid='accordion-item-1' />
        <TestAccordionItem itemKey='2' data-testid='accordion-item-2' />
      </Accordion>,
      {
        useAct: true,
      },
    )

    const accordionItem1 = getByTestId('accordion-item-1')
    const accordionItem2 = getByTestId('accordion-item-2')

    // Click second item - should close first and open second
    const trigger2 = accordionItem2.querySelector(
      `.${accordionItemSlotClasses.trigger}`,
    )

    await act(async () => {
      fireEvent.click(trigger2!)
    })

    expect(accordionItem1).toHaveAttribute('data-state', 'collapsed')
    expect(accordionItem2).toHaveAttribute('data-state', 'expanded')
  })
})
