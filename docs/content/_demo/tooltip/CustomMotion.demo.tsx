import { Tooltip, Button } from '@nex-ui/react'

export default function App() {
  return (
    <Tooltip
      content='Hello, I am a tooltip.'
      motionProps={{
        variants: {
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.1,
              ease: 'easeIn',
            },
          },
          hidden: {
            opacity: 0,
            scale: 0.9,
            transition: {
              duration: 0.1,
              ease: 'easeOut',
            },
          },
        },
      }}
    >
      <Button variant='faded'>Hover me</Button>
    </Tooltip>
  )
}
