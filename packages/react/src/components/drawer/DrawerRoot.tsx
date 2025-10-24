import { ModalBackdrop, ModalRoot } from '../modal'
import { useSlot, useSlotClasses, useStyles } from '../utils'
import { useDrawer } from './DrawerContext'
import { drawerRootRecipe } from '../../theme/recipes'
import type { DrawerProps } from './types'

const slots = ['root', 'backdrop']

export const DrawerRoot = ({ children }: DrawerProps) => {
  const ownerState = useDrawer()

  const styles = useStyles({
    name: 'Drawer',
    recipe: drawerRootRecipe,
    ownerState,
  })

  const { slotProps, classNames, hideBackdrop, ...remainingProps } = ownerState

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
  })

  const [DrawerBackdrop, getDrawerBackdropProps] = useSlot({
    elementType: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    shouldForwardComponent: false,
    classNames: slotClasses.backdrop,
  })

  return (
    <DrawerRootRoot {...getDrawerRootRootProps()}>
      {!hideBackdrop && <DrawerBackdrop {...getDrawerBackdropProps()} />}
      {children}
    </DrawerRootRoot>
  )
}

DrawerRoot.displayName = 'DrawerRoot'
