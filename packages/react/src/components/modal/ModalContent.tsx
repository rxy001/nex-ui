'use client'

import { nex } from '@nex-ui/styled'
import { CloseOutlined } from '@nex-ui/icons'
import { useNexUI } from '../provider'
import { ModalRoot } from './ModalRoot'
import {
  useSlotProps,
  useStyles,
  composeClasses,
  getUtilityClass,
  useDefaultProps,
} from '../utils'
import { Button } from '../button'
import { ModalClose } from './ModalClose'
import { modalContentRecipe } from '../../theme/recipes'
import { useModalProps } from './ModalContext'
import type { ElementType } from 'react'
import type { ModalContentOwnerState, ModalContentProps } from './types'

const useSlotClasses = () => {
  const { prefix } = useNexUI()

  const modalRoot = `${prefix}-modal`

  const slots = {
    content: ['content'],
  }

  const composedClasses = composeClasses(slots, getUtilityClass(modalRoot))

  return composedClasses
}

export const ModalContent = <RootComponent extends ElementType = 'section'>(
  inProps: ModalContentProps<RootComponent>,
) => {
  const { hideCloseButton } = useModalProps()
  const props = useDefaultProps<ModalContentProps>({
    name: 'ModalContent',
    props: inProps,
  })

  const { children, width = 'md', slotProps, ...remainingProps } = props

  const ownerState: ModalContentOwnerState = {
    ...props,
    width,
  }

  const styles = useStyles({
    ownerState,
    name: 'ModalContent',
    recipe: modalContentRecipe,
  })

  const classes = useSlotClasses()

  const contentProps = useSlotProps({
    ownerState,
    sx: styles.content,
    classNames: classes.content,
    externalForwardedProps: remainingProps,
  })

  const closeButtonProps = useSlotProps({
    ownerState,
    externalSlotProps: slotProps?.closeButton,
    sx: styles.closeBtn,
    additionalProps: {
      iconOnly: true,
      radius: 'full',
      variant: 'text',
      color: 'gray',
      size: 'sm',
    } as const,
  })

  return (
    <ModalRoot>
      <nex.section {...contentProps}>
        {!hideCloseButton && (
          <ModalClose>
            {
              // @ts-expect-error
              <Button<'button'> {...closeButtonProps}>
                <CloseOutlined />
              </Button>
            }
          </ModalClose>
        )}
        {children}
      </nex.section>
    </ModalRoot>
  )
}

ModalContent.displayName = 'ModalContent'
