'use client'

import {
  Button,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
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
          display: 'flex',
          pos: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
        ref={innerRef}
      >
        <Popover open>
          <PopoverTrigger>
            <Button>Scroll the window</Button>
          </PopoverTrigger>
          <PopoverContent
            shift
            container={() => innerRef.current}
            placement='top'
            flip={{
              mainAxis: true,
              crossAxis: true,
            }}
          >
            The floating element that shifts along the x-axis.
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  )
}
