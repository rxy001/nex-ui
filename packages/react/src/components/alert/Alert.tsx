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
    icon,
    color,
    status = 'info',
    variant = 'faded',
    radius = 'md',
    ...remainingProps
  } = props

  const computedIcon = useMemo(() => {
    if (icon) return icon

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
  }, [icon, status])

  const computedColor = useMemo(() => {
    if (color) return color

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
  }, [color, status])

  const ownerState: AlertProps = {
    ...props,
    status,
    variant,
    radius,
    icon: computedIcon,
    color: computedColor,
  }

  const slotClasses = useSlotClasses({
    name: 'Alert',
    slots,
    classNames,
  })

  const slotAriaProps = useMemo(
    () => ({
      root: {
        role: 'alert',
      },
      closeButton: {
        'aria-label': 'Close alert',
      },
    }),
    [],
  )

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
    ariaProps: slotAriaProps.root,
    dataAttrs: {
      radius,
      variant,
      color: computedColor,
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
    ariaProps: slotAriaProps.closeButton,
    additionalProps: {
      color: computedColor,
      variant: 'ghost',
      size: 'sm',
      iconOnly: true,
      radius: 'full',
      onClick: onClose,
    },
  })

  return (
    <AlertRoot {...getAlertRootProps()}>
      {computedIcon && !hideIcon && (
        <AlertIcon {...getAlertIconProps()}>{computedIcon}</AlertIcon>
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
