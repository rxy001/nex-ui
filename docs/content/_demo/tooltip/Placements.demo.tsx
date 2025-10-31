import { Tooltip, Button, Flex } from '@nex-ui/react'
import type { TooltipProps } from '@nex-ui/react'

export default function App() {
  const renderTooltip = (placement: TooltipProps['placement']) => {
    return (
      <Tooltip
        color='default'
        placement={placement}
        content='Hello, I am a tooltip.'
      >
        <Button
          size='sm'
          variant='faded'
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {placement}
        </Button>
      </Tooltip>
    )
  }

  return (
    <Flex justify='center'>
      <Flex direction='column' gap='3' sx={{ maxW: 500, flex: 1 }}>
        <Flex gap='3' justify='center'>
          {renderTooltip('top-start')}
          {renderTooltip('top')}
          {renderTooltip('top-end')}
        </Flex>
        <Flex justify='space-between'>
          <Flex direction='column' gap='3'>
            {renderTooltip('left-start')}
            {renderTooltip('left')}
            {renderTooltip('left-end')}
          </Flex>
          <Flex direction='column' gap='3'>
            {renderTooltip('right-start')}
            {renderTooltip('right')}
            {renderTooltip('right-end')}
          </Flex>
        </Flex>
        <Flex gap='3' justify='center'>
          {renderTooltip('bottom-start')}
          {renderTooltip('bottom')}
          {renderTooltip('bottom-end')}
        </Flex>
      </Flex>
    </Flex>
  )
}
