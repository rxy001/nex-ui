import { nex } from '@nex-ui/styled'
import type { ElementType, Ref } from 'react'
import {
  useDefaultProps,
  useSlotStyles,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
  useStyles,
} from '../utils'
import { accordion } from '../../theme/recipes'
import { useNexUI } from '../provider'
import type { AccordionProps } from './types'

export const Accordion = forwardRef(
  <RootComponent extends ElementType = 'div'>(
    inProps: AccordionProps<RootComponent>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const props = useDefaultProps<AccordionProps>({
      name: 'Accordion',
      props: inProps,
    })

    const ownerState = {
      ...props,
    }

    const { children, ...remainingProps } = props

    const styles = useStyles({
      ownerState,
      name: 'Accordion',
      recipe: accordion,
    })

    const rootProps = useSlotProps({
      externalForwardedProps: remainingProps,
      sx: styles,
      additionalProps: {
        ref,
      },
    })

    return <nex.div {...rootProps}>{children}</nex.div>
  },
)
