'use client'

import {
  Button,
  Box,
  PopoverTrigger,
  PopoverContent,
  Popover,
} from '@nex-ui/react'
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
          zIndex: 1,
        }}
        ref={innerRef}
      >
        <Popover
          open
          container={() => innerRef.current}
          placement='top-start'
          flip={{
            mainAxis: true,
            crossAxis: true,
          }}
        >
          <PopoverTrigger>
            <Button>Scroll the window</Button>
          </PopoverTrigger>
          <PopoverContent>
            The floating element that flips along the x-axis and y-axis.
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  )
}
