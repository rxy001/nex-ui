import { ModalBackdrop, ModalMotion, ModalPortal, ModalRoot } from '../modal'
import { useSlot, useSlotClasses, useStyles } from '../utils'
import { useDrawerPropsContext } from './DrawerContext'
import { drawerRootRecipe } from '../../theme/recipes'
import type { ReactNode } from 'react'

const slots = ['root', 'backdrop']

export const DrawerRoot = ({ children }: { children: ReactNode }) => {
  const props = useDrawerPropsContext()

  const styles = useStyles({
    name: 'Drawer',
    recipe: drawerRootRecipe,
    ownerState: props,
  })

  const {
    preventScroll,
    slotProps,
    classNames,
    hideBackdrop,
    container,
    keepMounted,
    motionProps,
    disableAnimation,
    ...remainingProps
  } = props

  const slotClasses = useSlotClasses({
    name: 'Drawer',
    slots,
    classNames,
  })

  const [DrawerRootRoot, getDrawerRootRootProps] = useSlot({
    elementType: ModalRoot,
    style: styles.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    classNames: slotClasses.root,
    additionalProps: {
      preventScroll,
    },
    dataAttrs: {
      hideBackdrop,
      disableAnimation,
    },
  })

  const [DrawerBackdrop, getDrawerBackdropProps] = useSlot({
    elementType: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    shouldForwardComponent: false,
    classNames: slotClasses.backdrop,
  })

  const renderDrawerRootRoot = () => (
    <DrawerRootRoot {...getDrawerRootRootProps()}>
      {!hideBackdrop && <DrawerBackdrop {...getDrawerBackdropProps()} />}
      {children}
    </DrawerRootRoot>
  )

  return (
    <ModalPortal
      disablePresence={disableAnimation}
      container={container}
      keepMounted={keepMounted}
    >
      {disableAnimation ? (
        renderDrawerRootRoot()
      ) : (
        <ModalMotion {...motionProps}>{renderDrawerRootRoot()}</ModalMotion>
      )}
    </ModalPortal>
  )
}

DrawerRoot.displayName = 'DrawerRoot'
