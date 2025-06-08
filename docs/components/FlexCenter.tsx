import { Flex } from '@nex-ui/react'
import type { InterpolationPrimitive } from '@nex-ui/system'
import type { FlexProps } from '@nex-ui/react'

type ExampleProps = Omit<FlexProps, 'sx'> & { sx: InterpolationPrimitive }

export function FlexCenter({ children, sx, ...props }: ExampleProps) {
  return (
    <Flex align='center' justify='center' sx={[{ mt: 20 }, sx]} {...props}>
      {children}
    </Flex>
  )
}
