import {
  CloseOutlined,
  ExclamationCircleFilled,
  ExclamationShieldFilled,
  ExclamationSquareFilled,
  CheckCircleFilled,
} from '@nex-ui/icons'
import { useMemo } from 'react'
import { __DEV__ } from '@nex-ui/utils'
import {
  useDefaultProps,
  useSlot,
  useStyles,
  composeClasses,
  getUtilityClass,
} from '../utils'
import { alertRecipe } from '../../theme/recipes'
import { useNexUI } from '../provider'
import { Button } from '../button'
import type { ElementType } from 'react'
import type { AlertOwnerState, AlertProps } from './types'

const useSlotClasses = (ownerState: AlertOwnerState) => {
  const { prefix } = useNexUI()
  const { classes, color, radius, variant, status } = ownerState

  return useMemo(() => {
    const AlertRoot = `${prefix}-alert`

    const slots = {
      root: [
        'root',
        `radius-${radius}`,
        `variant-${variant}`,
        `color-${color}`,
        `status-${status}`,
      ],
      icon: ['icon'],
      content: ['content'],
      title: ['title'],
      description: ['description'],
      closeButton: ['close-button'],
    }

    return composeClasses(slots, getUtilityClass(AlertRoot), classes)
  }, [classes, color, prefix, radius, status, variant])
}

const useSlotAriaProps = (ownerState: AlertOwnerState) => {
  const { role = 'alert' } = ownerState

  return {
    root: {
      role,
    },
    closeButton: {
      'aria-label': 'Close alert',
    },
  }
}

export const Alert = <RootComponent extends ElementType = 'div'>(
  inProps: AlertProps<RootComponent>,
) => {
  const props = useDefaultProps<AlertProps>({
    name: 'Alert',
    props: inProps,
  })

  const {
    title,
    closable,
    onClose,
    description,
    action,
    slotProps,
    hideIcon,
    icon: iconProp,
    color: colorProp,
    status = 'info',
    variant = 'faded',
    radius = 'md',
    ...remainingProps
  } = props

  const icon = useMemo(() => {
    if (iconProp) return iconProp

    switch (status) {
      case 'info':
        return <ExclamationCircleFilled />
      case 'success':
        return <CheckCircleFilled />
      case 'warning':
        return <ExclamationShieldFilled />
      case 'error':
        return <ExclamationSquareFilled />
      default:
        if (__DEV__) {
          console.error('[Nex UI] Alert: Unknown status %s', status)
        }
        return null
    }
  }, [iconProp, status])

  const color = useMemo(() => {
    if (colorProp) return colorProp

    switch (status) {
      case 'info':
        return 'blue'
      case 'success':
        return 'green'
      case 'warning':
        return 'yellow'
      case 'error':
        return 'red'
    }
  }, [colorProp, status])

  const ownerState: AlertOwnerState = {
    ...props,
    status,
    variant,
    icon,
    color,
    radius,
  }

  const slotClasses = useSlotClasses(ownerState)

  const slotAriaProps = useSlotAriaProps(ownerState)

  const styles = useStyles({
    ownerState,
    name: 'Alert',
    recipe: alertRecipe,
  })

  const [AlertRoot, getAlertRootProps] = useSlot({
    ownerState,
    elementType: 'div',
    externalForwardedProps: remainingProps,
    style: styles.root,
    classNames: slotClasses.root,
    a11y: slotAriaProps.root,
  })

  const [AlertIcon, getAlertIconProps] = useSlot({
    ownerState,
    elementType: 'div',
    style: styles.icon,
    externalSlotProps: slotProps?.icon,
    classNames: slotClasses.icon,
  })

  const [AlertContent, getAlertContentProps] = useSlot({
    ownerState,
    elementType: 'div',
    style: styles.content,
    externalSlotProps: slotProps?.content,
    classNames: slotClasses.content,
  })

  const [AlertTitle, getAlertTitleProps] = useSlot({
    ownerState,
    elementType: 'div',
    style: styles.title,
    externalSlotProps: slotProps?.title,
    classNames: slotClasses.title,
  })

  const [AlertDescription, getAlertDescriptionProps] = useSlot({
    ownerState,
    elementType: 'div',
    style: styles.description,
    externalSlotProps: slotProps?.description,
    classNames: slotClasses.description,
  })

  const [AlertCloseButton, getAlertCloseButtonProps] = useSlot({
    ownerState,
    elementType: Button,
    style: styles.closeButton,
    shouldForwardComponent: false,
    externalSlotProps: slotProps?.closeButton,
    classNames: slotClasses.closeButton,
    a11y: slotAriaProps.closeButton,
    additionalProps: {
      color,
      variant: 'ghost',
      size: 'sm',
      iconOnly: true,
      radius: 'full',
      onClick: onClose,
    },
  })

  return (
    <AlertRoot {...getAlertRootProps()}>
      {icon && !hideIcon && (
        <AlertIcon {...getAlertIconProps()}>{icon}</AlertIcon>
      )}
      <AlertContent {...getAlertContentProps()}>
        {title && <AlertTitle {...getAlertTitleProps()}>{title}</AlertTitle>}
        {description && (
          <AlertDescription {...getAlertDescriptionProps()}>
            {description}
          </AlertDescription>
        )}
      </AlertContent>
      {closable && !action ? (
        <AlertCloseButton {...getAlertCloseButtonProps()}>
          <CloseOutlined />
        </AlertCloseButton>
      ) : (
        action
      )}
    </AlertRoot>
  )
}

Alert.displayName = 'Alert'
