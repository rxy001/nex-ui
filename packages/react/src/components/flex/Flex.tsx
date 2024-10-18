import { forwardRef } from 'react'
import { nex } from '@nex-ui/styled'
import type { FlexProps } from './types'
import { useStyles } from '../utils'

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({
    sx,
    children,
    justify,
    align,
    direction,
    wrap,
    gap,
    grow,
    shrink,
    basis,
    ...props
  }) => {
    const ownerState = {
      direction,
      justify,
      align,
      wrap,
      gap,
      grow,
      shrink,
      basis,
      ...props,
    }

    const styles = useStyles({ name: 'Flex', ownerState })
    return (
      <nex.div
        sx={{
          gap,
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap,
          flexGrow: grow,
          flexShrink: shrink,
          flexBasis: basis,
          ...styles,
          ...sx,
        }}
      >
        {children}
      </nex.div>
    )
  },
)
