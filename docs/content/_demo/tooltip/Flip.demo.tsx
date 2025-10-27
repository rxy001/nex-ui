'use client'

import { Tooltip, Button, Box } from '@nex-ui/react'
import { useLayoutEffect, useRef } from 'react'

export default function App() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (outerRef.current) {
      outerRef.current.scrollTop = outerRef.current.clientHeight
      outerRef.current.scrollLeft = outerRef.current.clientWidth
    }
  }, [])

  return (
    <Box
      sx={{
        w: '100%',
        h: 150,
        overflow: 'auto',
      }}
      ref={outerRef}
    >
      <Box
        sx={{
          w: '300%',
          h: '300%',
          d: 'flex',
          pos: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        ref={innerRef}
      >
        <Tooltip
          open
          content='The floating element that flips along the x-axis and y-axis.'
          shift={false}
          container={() => innerRef.current}
          placement='top-start'
          flip={{
            mainAxis: true,
            crossAxis: true,
          }}
        >
          <Button variant='faded'>Scroll The Window</Button>
        </Tooltip>
      </Box>
    </Box>
  )
}
