import { createRef, useState } from 'react'
import { fireEvent, act, waitFor } from '@testing-library/react'
import {
  renderWithNexUIProvider,
  testComponentStability,
  testRootClassName,
  testVariantClasses,
} from '~/tests/shared'
import { Accordion, AccordionItem } from '../index'
import { Button } from '../../button'
import { accordionClasses, accordionItemClasses } from '../classes'
import type { Key } from 'react'

const children = (
  <AccordionItem itemKey='1' title='Accordion 1' data-testid='accordion-item'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
    malesuada lacus ex, sit amet blandit leo lobortis eget.
  </AccordionItem>
)

describe('Accordion', () => {
  testComponentStability(<Accordion>{children}</Accordion>, {
    useAct: true,
  })

  testRootClassName(<Accordion className='test-class' />, 'test-class', {
    useAct: true,
  })

  testVariantClasses(
    <Accordion>Button</Accordion>,
    ['variant', ['outlined', 'underlined']],
    accordionClasses,
    {
      useAct: true,
    },
  )

  it('should render with default props', async () => {
    const { container } = await renderWithNexUIProvider(
      <Accordion>{children}</Accordion>,
      {
        useAct: true,
      },
    )
    const accordionRoot = container.firstElementChild

    expect(accordionRoot).toMatchSnapshot()
    expect(accordionRoot).toHaveClass(accordionClasses.root)
    expect(accordionRoot).toHaveClass(accordionClasses['variant-underlined'])
    expect(accordionRoot).not.toHaveClass(accordionClasses['variant-outlined'])
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

    expect(container.firstElementChild).toBe(ref.current)
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
    expect(getByTestId('accordion-item')).toBe(ref.current)
  })

  it('should forward slotProps to heading, indicator, trigger and content slots', async () => {
    const slotProps = {
      heading: { className: 'test-heading' },
      indicator: { className: 'test-indicator' },
      trigger: { className: 'test-trigger' },
      content: { className: 'test-content' },
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion keepMounted>
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

    const accordionItemRoot = getByTestId('accordion-item')

    expect(
      accordionItemRoot.querySelector(`.${accordionItemClasses.heading}`),
    ).toHaveClass(slotProps.heading.className)
    expect(
      accordionItemRoot.querySelector(`.${accordionItemClasses.indicator}`),
    ).toHaveClass(slotProps.indicator.className)
    expect(
      accordionItemRoot.querySelector(`.${accordionItemClasses.trigger}`),
    ).toHaveClass(slotProps.trigger.className)
    expect(
      accordionItemRoot.querySelector(`.${accordionItemClasses.content}`),
    ).toHaveClass(slotProps.content.className)
  })

  it('should forward classes to root, heading, indicator, trigger and content slots', async () => {
    const classes = {
      root: 'test-root',
      heading: 'test-heading',
      indicator: 'test-indicator',
      trigger: 'test-trigger',
      content: 'test-content',
    }
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion keepMounted>
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

    const accordionItemRoot = getByTestId('accordion-item')
    expect(accordionItemRoot).toHaveClass(classes.root)
    expect(
      accordionItemRoot.querySelector(`.${classes.heading}`),
    ).toBeInTheDocument()
    expect(
      accordionItemRoot.querySelector(`.${classes.indicator}`),
    ).toBeInTheDocument()
    expect(
      accordionItemRoot.querySelector(`.${classes.trigger}`),
    ).toBeInTheDocument()
    expect(
      accordionItemRoot.querySelector(`.${classes.content}`),
    ).toBeInTheDocument()
  })

  it('should render expanded items when defaultExpandedKeys is provided', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion defaultExpandedKeys={['1']}>{children}</Accordion>,
      {
        useAct: true,
      },
    )
    expect(getByTestId('accordion-item')).toHaveClass(
      accordionItemClasses.expanded,
    )
  })

  it('should have default itemKey on AccordionItem', async () => {
    const { getByTestId, getByRole } = await renderWithNexUIProvider(
      <Accordion>
        <AccordionItem title='Accordion 1' data-testid='accordion-item'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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

    expect(accordionItemRoot).toHaveClass(accordionItemClasses.expanded)
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
            {children}
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
    expect(accordionItemRoot).not.toHaveClass(accordionItemClasses.expanded)

    const button = getByTestId('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(accordionItemRoot).toHaveClass(accordionItemClasses.expanded)
  })

  it('should always render the AccordionItem content when keepMounted=true', async () => {
    const { rerender, getByTestId } = await renderWithNexUIProvider(
      <Accordion keepMounted expandedKeys={['1']}>
        {children}
      </Accordion>,
      {
        useAct: true,
      },
    )

    const accordionItemRoot = getByTestId('accordion-item')

    expect(
      accordionItemRoot.querySelector(`.${accordionItemClasses.content}`),
    ).toBeInTheDocument()

    await act(async () => {
      rerender(
        <Accordion keepMounted expandedKeys={[]}>
          {children}
        </Accordion>,
      )
    })
    expect(
      accordionItemRoot.querySelector(`.${accordionItemClasses.content}`),
    ).toBeInTheDocument()
  })

  it('should unmount AccordionItem content when collapsed and keepMounted=false', async () => {
    const { getByTestId, rerender } = await renderWithNexUIProvider(
      <Accordion keepMounted={false} expandedKeys={['1']}>
        {children}
      </Accordion>,
      {
        useAct: true,
      },
    )

    const accordionItemRoot = getByTestId('accordion-item')
    expect(
      accordionItemRoot.querySelector(`.${accordionItemClasses.content}`),
    ).toBeInTheDocument()

    await act(async () => {
      rerender(
        <Accordion keepMounted={false} expandedKeys={[]}>
          {children}
        </Accordion>,
      )
    })

    await waitFor(() => {
      expect(
        accordionItemRoot.querySelector(`.${accordionItemClasses.content}`),
      ).not.toBeInTheDocument()
    })
  })

  it('should render multiple expanded AccordionItems when multiple=true', async () => {
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
    const accordionRoot = container.firstElementChild

    expect(
      accordionRoot?.querySelectorAll(`.${accordionItemClasses.expanded}`),
    ).toHaveLength(1)

    await act(async () => {
      rerender(
        <Accordion multiple expandedKeys={['1', '2']}>
          {arrayChildren}
        </Accordion>,
      )
    })
    expect(
      accordionRoot?.querySelectorAll(`.${accordionItemClasses.expanded}`),
    ).toHaveLength(2)
  })

  it('should be non-interactive AccordionItem when disabled=true', async () => {
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
    const accordionItemRoot1 = getByTestId('accordion-item-1')
    expect(accordionItemRoot1).toHaveClass(accordionItemClasses.disabled)
    expect(accordionItemRoot1).toHaveStyleRule('pointer-events', 'none')

    const accordionItemRoot2 = getByTestId('accordion-item-2')
    expect(accordionItemRoot2).toHaveClass(accordionItemClasses.disabled)
    expect(accordionItemRoot2).toHaveStyleRule('pointer-events', 'none')
  })

  it('should hide indicator when hideIndicator=true', async () => {
    const { getByTestId } = await renderWithNexUIProvider(
      <Accordion hideIndicator={true}>{children}</Accordion>,
      {
        useAct: true,
      },
    )
    const accordionItemRoot = getByTestId('accordion-item')

    expect(
      accordionItemRoot.querySelector(`.${accordionItemClasses.indicator}`),
    ).not.toBeInTheDocument()
  })

  it('should customize indicator', async () => {
    const customIndicator = <span data-testid='custom-indicator'>▼</span>
    const { queryByTestId } = await renderWithNexUIProvider(
      <Accordion indicator={customIndicator}>{children}</Accordion>,
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
        {children}
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
    const accordionItemRoot1 = getByTestId('accordion-item-1')
    expect(accordionItemRoot1).toHaveClass(accordionItemClasses.expanded)
    const trigger1 = accordionItemRoot1.querySelector(
      `.${accordionItemClasses.trigger}`,
    )
    await act(async () => {
      fireEvent.click(trigger1!)
    })
    expect(accordionItemRoot1).not.toHaveClass(accordionItemClasses.expanded)

    const accordionItemRoot2 = getByTestId('accordion-item-2')
    expect(accordionItemRoot2).not.toHaveClass(accordionItemClasses.expanded)
    const trigger2 = accordionItemRoot2.querySelector(
      `.${accordionItemClasses.trigger}`,
    )
    await act(async () => {
      fireEvent.click(trigger2!)
    })
    expect(accordionItemRoot2).toHaveClass(accordionItemClasses.expanded)

    await act(async () => {
      fireEvent.click(trigger2!)
    })
    expect(accordionItemRoot2).not.toHaveClass(accordionItemClasses.expanded)
  })

  describe('Accessibility', () => {
    it('should have role="button", aria-expanded and aria-controls in AccordionItem heading', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Accordion keepMounted>{children}</Accordion>,
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
        <Accordion keepMounted>{children}</Accordion>,
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
        <Accordion>{children}</Accordion>,
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
        <Accordion>{children}</Accordion>,
        {
          useAct: true,
        },
      )

      const heading = getByRole('heading', { name: 'Accordion 1' })
      expect(heading.tagName).toBe('H3')
    })

    it('should apply disabled attribute to AccordionItem button when disabled=true', async () => {
      const { getByRole } = await renderWithNexUIProvider(
        <Accordion disabled>{children}</Accordion>,
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
        <Accordion>{children}</Accordion>,
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

      await user.keyboard('{ }')
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await user.keyboard('{ }')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    })

    it("should focus the header's trigger of AccordionItem when Tab or Shift+Tab is pressed", async () => {
      const { getAllByRole, user } = await renderWithNexUIProvider(
        <Accordion>
          <AccordionItem itemKey='1' title='Accordion 1'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AccordionItem>
          <AccordionItem itemKey='2' title='Accordion 2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AccordionItem>
          <AccordionItem itemKey='3' title='Accordion 3'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </AccordionItem>
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
