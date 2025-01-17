import { Flex } from '@nex-ui/react'
import type { FlexProps } from '@nex-ui/react'

type ExampleProps = FlexProps

export function Example({ children, sx, ...props }: ExampleProps) {
  return (
    <Flex align="center" justify="center" sx={{ mt: 20, ...sx }} {...props}>
      {children}
    </Flex>
  )
}
