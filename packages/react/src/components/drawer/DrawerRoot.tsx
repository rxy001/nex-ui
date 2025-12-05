import { ModalBackdrop, ModalMotion, ModalPortal, ModalRoot } from '../modal'
import { useSlot, useSlotClasses, useStyles } from '../utils'
import { useDrawerRootProps } from './DrawerContext'
import { drawerRootRecipe } from '../../theme/recipes'
import type { DrawerProps } from './types'

const slots = ['root', 'backdrop']

export const DrawerRoot = ({ children }: DrawerProps) => {
  const props = useDrawerRootProps()

  const styles = useStyles({
    name: 'Drawer',
    recipe: drawerRootRecipe,
    ownerState: props,
  })

  const {
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
  })

  const [DrawerBackdrop, getDrawerBackdropProps] = useSlot({
    elementType: ModalBackdrop,
    style: styles.backdrop,
    externalSlotProps: slotProps?.backdrop,
    shouldForwardComponent: false,
    classNames: slotClasses.backdrop,
  })

  const renderChildren = () => (
    <>
      {!hideBackdrop && <DrawerBackdrop {...getDrawerBackdropProps()} />}
      {children}
    </>
  )

  return (
    <ModalPortal
      disableAnimation={disableAnimation}
      container={container}
      keepMounted={keepMounted}
    >
      <DrawerRootRoot {...getDrawerRootRootProps()}>
        {disableAnimation ? (
          renderChildren()
        ) : (
          <ModalMotion {...motionProps}>{renderChildren()}</ModalMotion>
        )}
      </DrawerRootRoot>
    </ModalPortal>
  )
}

DrawerRoot.displayName = 'DrawerRoot'
