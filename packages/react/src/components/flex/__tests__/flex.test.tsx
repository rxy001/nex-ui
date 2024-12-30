import { describe, it, expect } from '@jest/globals'
import { mountTest, refTest, renderWithNexProvider } from '~/tests/shared'
import { Flex } from '../Flex'
import { flexClasses } from '../flexClasses'

describe('Flex', () => {
  mountTest(<Flex />)
  refTest(<Flex />)

  it('renders correctly', () => {
    const { container } = renderWithNexProvider(<Flex />)
    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should render with the root, direction classes but no others', () => {
    const { container } = renderWithNexProvider(<Flex />)

    const flex = container.firstElementChild

    expect(flex).toHaveClass(flexClasses.root)
    expect(flex).toHaveClass(flexClasses['direction-row'])

    expect(flex).not.toHaveClass(flexClasses['align-center'])
    expect(flex).not.toHaveClass(flexClasses['align-end'])
    expect(flex).not.toHaveClass(flexClasses['align-flex-end'])
    expect(flex).not.toHaveClass(flexClasses['align-flex-start'])
    expect(flex).not.toHaveClass(flexClasses['align-self-end'])
    expect(flex).not.toHaveClass(flexClasses['align-self-start'])
    expect(flex).not.toHaveClass(flexClasses['align-start'])
    expect(flex).not.toHaveClass(flexClasses['direction-column'])
    expect(flex).not.toHaveClass(flexClasses['direction-column-reverse'])
    expect(flex).not.toHaveClass(flexClasses['direction-row-reverse'])
    expect(flex).not.toHaveClass(flexClasses['gap-10px'])
    expect(flex).not.toHaveClass(flexClasses['gap-20px'])
    expect(flex).not.toHaveClass(flexClasses.inline)
    expect(flex).not.toHaveClass(flexClasses['justify-center'])
    expect(flex).not.toHaveClass(flexClasses['justify-end'])
    expect(flex).not.toHaveClass(flexClasses['justify-flex-end'])
    expect(flex).not.toHaveClass(flexClasses['justify-flex-start'])
    expect(flex).not.toHaveClass(flexClasses['justify-left'])
    expect(flex).not.toHaveClass(flexClasses['justify-right'])
    expect(flex).not.toHaveClass(flexClasses['justify-space-around'])
    expect(flex).not.toHaveClass(flexClasses['justify-space-between'])
    expect(flex).not.toHaveClass(flexClasses['justify-space-evenly'])
    expect(flex).not.toHaveClass(flexClasses['justify-start'])
    expect(flex).not.toHaveClass(flexClasses['wrap-nowrap'])
    expect(flex).not.toHaveClass(flexClasses['wrap-wrap'])
    expect(flex).not.toHaveClass(flexClasses['wrap-wrap-reverse'])
  })

  it('should add the appropriate justify class to root element based on justify prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <Flex justify="center" data-testid="justify-center" />
        <Flex justify="end" data-testid="justify-end" />
        <Flex justify="flex-end" data-testid="justify-flex-end" />
        <Flex justify="flex-start" data-testid="justify-flex-start" />
        <Flex justify="left" data-testid="justify-left" />
        <Flex justify="revert" data-testid="justify-revert" />
        <Flex justify="right" data-testid="justify-right" />
        <Flex justify="space-around" data-testid="justify-space-around" />
        <Flex justify="space-between" data-testid="justify-space-between" />
        <Flex justify="space-evenly" data-testid="justify-space-evenly" />
        <Flex justify="start" data-testid="justify-start" />
        <Flex justify="stretch" data-testid="justify-stretch" />
        <Flex justify="normal" data-testid="justify-normal" />
        <Flex justify="revert-layer" data-testid="justify-revert-layer" />
      </>,
    )

    expect(getByTestId('justify-center')).toHaveClass(
      flexClasses['justify-center'],
    )
    expect(getByTestId('justify-end')).toHaveClass(flexClasses['justify-end'])
    expect(getByTestId('justify-flex-end')).toHaveClass(
      flexClasses['justify-flex-end'],
    )
    expect(getByTestId('justify-flex-start')).toHaveClass(
      flexClasses['justify-flex-start'],
    )
    expect(getByTestId('justify-left')).toHaveClass(flexClasses['justify-left'])
    expect(getByTestId('justify-revert')).toHaveClass(
      flexClasses['justify-revert'],
    )
    expect(getByTestId('justify-right')).toHaveClass(
      flexClasses['justify-right'],
    )
    expect(getByTestId('justify-space-around')).toHaveClass(
      flexClasses['justify-space-around'],
    )
    expect(getByTestId('justify-space-between')).toHaveClass(
      flexClasses['justify-space-between'],
    )
    expect(getByTestId('justify-space-evenly')).toHaveClass(
      flexClasses['justify-space-evenly'],
    )
    expect(getByTestId('justify-start')).toHaveClass(
      flexClasses['justify-start'],
    )
    expect(getByTestId('justify-stretch')).toHaveClass(
      flexClasses['justify-stretch'],
    )
    expect(getByTestId('justify-normal')).toHaveClass(
      flexClasses['justify-normal'],
    )
    expect(getByTestId('justify-revert-layer')).toHaveClass(
      flexClasses['justify-revert-layer'],
    )
  })

  it('should add the appropriate align class to root element based on align prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <Flex align="baseline" data-testid="align-baseline" />
        <Flex align="end" data-testid="align-end" />
        <Flex align="center" data-testid="align-center" />
        <Flex align="revert" data-testid="align-revert" />
        <Flex align="self-end" data-testid="align-self-end" />
        <Flex align="self-start" data-testid="align-self-start" />
        <Flex align="start" data-testid="align-start" />
        <Flex align="stretch" data-testid="align-stretch" />
        <Flex align="normal" data-testid="align-normal" />
        <Flex align="revert-layer" data-testid="align-revert-layer" />
        <Flex align="flex-end" data-testid="align-flex-end" />
        <Flex align="flex-start" data-testid="align-flex-start" />
      </>,
    )

    expect(getByTestId('align-baseline')).toHaveClass(
      flexClasses['align-baseline'],
    )
    expect(getByTestId('align-end')).toHaveClass(flexClasses['align-end'])
    expect(getByTestId('align-center')).toHaveClass(flexClasses['align-center'])
    expect(getByTestId('align-revert')).toHaveClass(flexClasses['align-revert'])
    expect(getByTestId('align-self-end')).toHaveClass(
      flexClasses['align-self-end'],
    )
    expect(getByTestId('align-self-start')).toHaveClass(
      flexClasses['align-self-start'],
    )
    expect(getByTestId('align-start')).toHaveClass(flexClasses['align-start'])
    expect(getByTestId('align-stretch')).toHaveClass(
      flexClasses['align-stretch'],
    )
    expect(getByTestId('align-normal')).toHaveClass(flexClasses['align-normal'])
    expect(getByTestId('align-revert-layer')).toHaveClass(
      flexClasses['align-revert-layer'],
    )
    expect(getByTestId('align-flex-end')).toHaveClass(
      flexClasses['align-flex-end'],
    )
    expect(getByTestId('align-flex-start')).toHaveClass(
      flexClasses['align-flex-start'],
    )
  })

  it('should add the appropriate direction class to root element based on direction prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <Flex direction="column" data-testid="direction-column" />
        <Flex
          direction="column-reverse"
          data-testid="direction-column-reverse"
        />
        <Flex direction="row" data-testid="direction-row" />
        <Flex direction="row-reverse" data-testid="direction-row-reverse" />
        <Flex direction="revert" data-testid="direction-revert" />
        <Flex direction="revert-layer" data-testid="direction-revert-layer" />
      </>,
    )

    expect(getByTestId('direction-column')).toHaveClass(
      flexClasses['direction-column'],
    )
    expect(getByTestId('direction-column-reverse')).toHaveClass(
      flexClasses['direction-column-reverse'],
    )
    expect(getByTestId('direction-row')).toHaveClass(
      flexClasses['direction-row'],
    )
    expect(getByTestId('direction-row-reverse')).toHaveClass(
      flexClasses['direction-row-reverse'],
    )
    expect(getByTestId('direction-revert')).toHaveClass(
      flexClasses['direction-revert'],
    )
    expect(getByTestId('direction-revert-layer')).toHaveClass(
      flexClasses['direction-revert-layer'],
    )
  })

  it('should add the appropriate wrap class to root element based on wrap prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <>
        <Flex wrap="nowrap" data-testid="wrap-nowrap" />
        <Flex wrap="revert" data-testid="wrap-revert" />
        <Flex wrap="revert-layer" data-testid="wrap-revert-layer" />
        <Flex wrap="wrap" data-testid="wrap-wrap" />
        <Flex wrap="wrap-reverse" data-testid="wrap-wrap-reverse" />
      </>,
    )

    expect(getByTestId('wrap-nowrap')).toHaveClass(flexClasses['wrap-nowrap'])
    expect(getByTestId('wrap-revert')).toHaveClass(flexClasses['wrap-revert'])
    expect(getByTestId('wrap-revert-layer')).toHaveClass(
      flexClasses['wrap-revert-layer'],
    )
    expect(getByTestId('wrap-wrap')).toHaveClass(flexClasses['wrap-wrap'])
    expect(getByTestId('wrap-wrap-reverse')).toHaveClass(
      flexClasses['wrap-wrap-reverse'],
    )
  })

  it('should add the appropriate inline class to root element based on inline prop', () => {
    const { getByTestId } = renderWithNexProvider(
      <Flex inline data-testid="inline" />,
    )

    expect(getByTestId('inline')).toHaveClass(flexClasses.inline)
  })

  it('should forward classes to Flex', () => {
    const rootClassName = 'test-root-class'

    const { container } = renderWithNexProvider(
      <Flex
        classes={{
          root: rootClassName,
        }}
      />,
    )

    const flex = container.firstElementChild
    expect(flex).toHaveClass(rootClassName)
  })
})
