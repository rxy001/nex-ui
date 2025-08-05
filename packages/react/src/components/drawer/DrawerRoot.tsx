import { ModalBackdrop, ModalRoot } from '../modal'
import { useNexUI } from '../provider'
import { useSlot, composeClasses, getUtilityClass, useStyles } from '../utils'
import { useDrawer } from './DrawerContext'
import { drawerRootRecipe } from '../../theme/recipes'
import type { DrawerProps } from './types'

const useSlotClasses = (ownerState: DrawerProps) => {
  const { prefix } = useNexUI()

  const drawerRoot = `${prefix}-drawer`

  const { classes, open } = ownerState

  const slots = {
    root: ['root', open && 'open'],
    backdrop: ['backdrop'],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(drawerRoot),
    classes,
  )

  return composedClasses
}

export const DrawerRoot = ({ children }: DrawerProps) => {
  const ownerState = useDrawer()

  const classes = useSlotClasses(ownerState)

  const styles = useStyles({
    name: 'Drawer',
    recipe: drawerRootRecipe,
    ownerState,
  })

  const {
    slotProps,
    hideBackdrop,
    onOpenChange: _onOpenChange,
    container: _container,
    classes: _classes,
    open: _open,
    restoreFocus: _restoreFocus,
    closeOnEscape: _closeOnEscape,
    preventScroll: _preventScroll,
    closeOnInteractBackdrop: _closeOnInteractBackdrop,
    defaultOpen: _defaultOpen,
    keepMounted: _keepMounted,
    setOpen: _setOpen,
    ...remainingProps
  } = ownerState

  const [Root, getRootProps] = useSlot({
    ownerState,
    elementType: ModalRoot,
    style: styles.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    classNames: classes.root,
  })

  const [DrawerBackdrop, getDrawerBackdropProps] = useSlot({
    ownerState,
    elementType: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    shouldForwardComponent: false,
    classNames: classes.backdrop,
  })

  return (
    <Root {...getRootProps()}>
      {!hideBackdrop && <DrawerBackdrop {...getDrawerBackdropProps()} />}
      {children}
    </Root>
  )
}

DrawerRoot.displayName = 'DrawerRoot'
