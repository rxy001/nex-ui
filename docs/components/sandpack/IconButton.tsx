import { Button } from '@nex-ui/react'
import type { ButtonProps } from '@nex-ui/react'
import type { ElementType } from 'react'

const sx = {
  color: 'white',
  _hover: {
    bg: '#6d6d6f',
  },
}

export const IconButton = <T extends ElementType>(props: ButtonProps<T>) => (
  <Button iconOnly size='sm' sx={sx} variant='ghost' {...props} />
)
