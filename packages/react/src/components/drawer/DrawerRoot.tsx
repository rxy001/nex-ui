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

  const {
    open,
    slotProps,
    classNames,
    hideBackdrop,
    onOpenChange: _onOpenChange,
    container: _container,
    restoreFocus: _restoreFocus,
    closeOnEscape: _closeOnEscape,
    preventScroll: _preventScroll,
    closeOnInteractBackdrop: _closeOnInteractBackdrop,
    defaultOpen: _defaultOpen,
    keepMounted: _keepMounted,
    setOpen: _setOpen,
    ...remainingProps
  } = ownerState

  const slotClasses = useSlotClasses({
    name: 'Drawer',
    slots,
    classNames,
  })

  const [Root, getRootProps] = useSlot({
    elementType: ModalRoot,
    style: styles.root,
    externalForwardedProps: remainingProps,
    shouldForwardComponent: false,
    classNames: slotClasses.root,
    dataAttrs: {
      state: open ? 'open' : 'closed',
    },
  })

  const [DrawerBackdrop, getDrawerBackdropProps] = useSlot({
    elementType: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    shouldForwardComponent: false,
    classNames: slotClasses.backdrop,
  })

  return (
    <Root {...getRootProps()}>
      {!hideBackdrop && <DrawerBackdrop {...getDrawerBackdropProps()} />}
      {children}
    </Root>
  )
}

DrawerRoot.displayName = 'DrawerRoot'
