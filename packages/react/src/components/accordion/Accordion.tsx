import { nex } from '@nex-ui/styled'
import { useMemo } from 'react'
import { useControlledState, useEvent } from '@nex-ui/hooks'
import { filter } from '@nex-ui/utils'
import type { ElementType, Ref, Key } from 'react'
import { AccordionProvider } from './Context'
import { useNexUI } from '../provider'
import {
  useDefaultProps,
  forwardRef,
  useSlotProps,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { accordionRecipe } from '../../theme/recipes'
import type { AccordionProps } from './types'

const useSlotClasses = (ownerState: AccordionProps) => {
  const { prefix } = useNexUI()

  const { disabled, hideIndicator, keepMounted } = ownerState

  const accordionRoot = `${prefix}-accordion`

  const slots = {
    root: [
      'root',
      hideIndicator && 'hide-indicator',
      keepMounted && 'keep-mounted',
      disabled && 'disabled',
    ],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(accordionRoot))

  return composedClasses
}

export const Accordion = forwardRef(
  <RootComponent extends ElementType = 'div'>(
    inProps: AccordionProps<RootComponent>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const props = useDefaultProps<AccordionProps>({
      name: 'Accordion',
      props: inProps,
    })

    const {
      children,
      indicator,
      motionProps,
      hideDivider = false,
      hideIndicator = false,
      multiple = true,
      disabled = false,
      disabledExpandedKeys = [],
      keepMounted = true,
      defaultExpandedKeys = [],
      onExpandedKeysChange,
      expandedKeys: expandedKeysProps,
      ...remainingProps
    } = props

    const [expandedKeys, setExpandedKeys] = useControlledState(
      expandedKeysProps,
      defaultExpandedKeys,
      onExpandedKeysChange,
    )

    const ownerState = {
      ...props,
      hideIndicator,
      hideDivider,
      multiple,
      disabled,
      disabledExpandedKeys,
      keepMounted,
      defaultExpandedKeys,
      expandedKeys,
    }

    const classes = useSlotClasses(ownerState)

    const styles = useStyles({
      ownerState,
      name: 'Accordion',
      recipe: accordionRecipe,
    })

    const rootProps = useSlotProps({
      externalForwardedProps: remainingProps,
      sx: styles,
      classNames: classes.root,
      additionalProps: {
        ref,
      },
    })

    const toggleExpandedKey = useEvent((key: Key) => {
      if (expandedKeys.includes(key)) {
        if (multiple) {
          setExpandedKeys(filter(expandedKeys, (k) => k !== key))
          return
        }
        setExpandedKeys([])
      } else {
        if (multiple) {
          setExpandedKeys([...expandedKeys, key])
          return
        }
        setExpandedKeys([key])
      }
    })

    const ctx = useMemo(
      () => ({
        expandedKeys,
        toggleExpandedKey,
        motionProps,
        disabledExpandedKeys,
        disabled,
        keepMounted,
        hideIndicator,
        indicator,
        hideDivider,
      }),
      [
        disabled,
        disabledExpandedKeys,
        expandedKeys,
        hideIndicator,
        indicator,
        keepMounted,
        motionProps,
        toggleExpandedKey,
        hideDivider,
      ],
    )

    return (
      <AccordionProvider value={ctx}>
        <nex.div {...rootProps}>{children}</nex.div>
      </AccordionProvider>
    )
  },
)
