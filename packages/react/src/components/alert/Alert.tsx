'use client'

import {
  CloseOutlined,
  ExclamationCircleFilled,
  ExclamationShieldFilled,
  ExclamationSquareFilled,
  CheckCircleFilled,
} from '@nex-ui/icons'
import { useMemo } from 'react'
import { __DEV__ } from '@nex-ui/utils'
import { useDefaultProps, useSlot, useStyles, useSlotClasses } from '../utils'
import { alertRecipe } from '../../theme/recipes'
import { Button } from '../button'
import type { ElementType } from 'react'
import type { AlertProps } from './types'

const useSlotAriaProps = (ownerState: AlertProps) => {
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

const slots = ['root', 'icon', 'content', 'title', 'description', 'closeButton']

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
    classNames,
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

  const ownerState: AlertProps = {
    ...props,
    status,
    variant,
    icon,
    color,
    radius,
  }

  const slotClasses = useSlotClasses({
    name: 'Alert',
    slots,
    classNames,
  })

  const slotAriaProps = useSlotAriaProps(ownerState)

  const styles = useStyles({
    ownerState,
    name: 'Alert',
    recipe: alertRecipe,
  })

  const [AlertRoot, getAlertRootProps] = useSlot({
    elementType: 'div',
    externalForwardedProps: remainingProps,
    style: styles.root,
    classNames: slotClasses.root,
    a11y: slotAriaProps.root,
    dataAttrs: {
      radius,
      variant,
      color,
      status,
    },
  })

  const [AlertIcon, getAlertIconProps] = useSlot({
    elementType: 'div',
    style: styles.icon,
    externalSlotProps: slotProps?.icon,
    classNames: slotClasses.icon,
  })

  const [AlertContent, getAlertContentProps] = useSlot({
    elementType: 'div',
    style: styles.content,
    externalSlotProps: slotProps?.content,
    classNames: slotClasses.content,
  })

  const [AlertTitle, getAlertTitleProps] = useSlot({
    elementType: 'div',
    style: styles.title,
    externalSlotProps: slotProps?.title,
    classNames: slotClasses.title,
  })

  const [AlertDescription, getAlertDescriptionProps] = useSlot({
    elementType: 'div',
    style: styles.description,
    externalSlotProps: slotProps?.description,
    classNames: slotClasses.description,
  })

  const [AlertCloseButton, getAlertCloseButtonProps] = useSlot({
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
