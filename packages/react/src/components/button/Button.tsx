'use client'

import { LoadingOutlined } from '@nex-ui/icons'
import { useEvent, useFocusVisible } from '@nex-ui/hooks'
import { nex } from '@nex-ui/styled'
import { useRef } from 'react'
import type {
  Ref,
  MouseEvent,
  ElementType,
  HTMLAttributes,
  KeyboardEvent,
} from 'react'
import { isFunction, mergeRefs } from '@nex-ui/utils'
import { useNexUI } from '../provider'
import { buttonRecipe } from '../../theme/slotRecipes'
import {
  useDefaultProps,
  composeClasses,
  getUtilityClass,
  forwardRef,
  useSlotProps,
  useSlotStyles,
  Ripple,
} from '../utils'
import type { ButtonProps, ButtonOwnerState } from './types'
import { Icon } from '../icon'

const useSlotClasses = (ownerState: ButtonOwnerState) => {
  const { prefix } = useNexUI()

  const btnRoot = `${prefix}-btn`

  const {
    color,
    variant,
    radius,
    size,
    iconOnly,
    loading,
    disabled,
    fullWidth,
    classes,
    disableRipple,
  } = ownerState

  const slots = {
    root: [
      'root',
      `variant-${variant}`,
      `radius-${radius}`,
      `size-${size}`,
      `color-${color}`,
      iconOnly && `icon-only`,
      loading && `loading`,
      disabled && `disabled`,
      fullWidth && `full-width`,
      disableRipple && 'disable-ripple',
    ],
    startIcon: [
      `icon`,
      `start-icon`,
      `icon-size-${size}`,
      loading && `icon-loading`,
    ],
    endIcon: [`icon`, `end-icon`, `icon-size-${size}`],
  }

  const composedClasses = composeClasses(
    slots,
    getUtilityClass(btnRoot),
    classes,
  )

  return composedClasses
}

const useAriaProps = (
  ownerState: ButtonOwnerState,
): Record<'root' | 'icon', HTMLAttributes<HTMLElement>> => {
  const {
    as,
    disabled: disabledProps,
    type,
    role,
    loading,
    tabIndex,
  } = ownerState
  const disabled = disabledProps || loading

  let root = {}

  if (as === 'button') {
    root = {
      disabled,
      type,
      tabIndex: disabled ? -1 : tabIndex,
    }
  } else if (isFunction(as)) {
    root = {
      loading,
      tabIndex,
      disabled: disabledProps,
    }
  } else {
    root = {
      role: role ?? 'button',
      'data-disabled': disabled || undefined,
      'aria-disabled': disabled || undefined,
      tabIndex: disabled ? -1 : tabIndex,
    }
  }

  const icon = {
    'aria-hidden': true,
    focusable: false,
  }

  return { root, icon }
}

export const Button = forwardRef(
  <RootComponent extends ElementType = 'button'>(
    inProps: ButtonProps<RootComponent>,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const { primaryColor } = useNexUI()

    const props = useDefaultProps<ButtonProps>({
      name: 'Button',
      props: inProps,
    })

    const {
      as,
      children,
      slotProps,
      spinner,
      href,
      type = 'button',
      tabIndex = 0,
      color = primaryColor,
      spinnerPlacement = 'start',
      variant = 'solid',
      size = 'md',
      radius = size,
      iconOnly = false,
      loading = false,
      disabled: disabledProp = false,
      fullWidth = false,
      startIcon: startIconProp,
      endIcon: endIconProp,
      onClick: onClickProp,
      onKeyUp: onKeyUpProp,
      disableRipple,
      ...remainingProps
    } = props

    const btnRef = useRef<HTMLButtonElement>(null)

    const mergedRefs = mergeRefs(btnRef, ref)

    const disabled = loading || disabledProp

    const rootElement = (
      as !== undefined ? as : typeof href === 'string' && href ? 'a' : 'button'
    ) as 'button'

    const ownerState = {
      ...props,
      type,
      tabIndex,
      variant,
      size,
      radius,
      iconOnly,
      loading,
      fullWidth,
      color,
      disableRipple,
      disabled: disabledProp,
      as: rootElement,
    }

    const [focusVisible] = useFocusVisible({ ref: btnRef })

    const classes = useSlotClasses(ownerState)

    const styles = useSlotStyles({
      ownerState: {
        ...ownerState,
        disabled,
      },
      name: 'Button',
      slotRecipe: buttonRecipe,
    })

    const onClick = useEvent((event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault()
        return
      }

      onClickProp?.(event)
    })

    const onKeyUp = useEvent((event: KeyboardEvent<HTMLButtonElement>) => {
      // Keyboard accessibility for non interactive elements
      if (
        focusVisible &&
        !disabled &&
        rootElement !== 'button' &&
        (event.code === 'Space' || event.code === 'Enter')
      ) {
        btnRef.current?.click()
      }

      onKeyUpProp?.(event)
    })

    const { root: rootAriaProps, icon: iconAriaProps } =
      useAriaProps(ownerState)

    const rootProps = useSlotProps({
      ownerState,
      externalForwardedProps: remainingProps,
      classNames: classes.root,
      sx: styles.root,
      additionalProps: {
        onClick,
        onKeyUp,
        href,
        ref: mergedRefs,
        as: rootElement,
        ...rootAriaProps,
      },
    })

    const startIconProps = useSlotProps({
      ownerState,
      externalSlotProps: slotProps?.startIcon,
      classNames: classes.startIcon,
      sx: styles.startIcon,
      additionalProps: {
        ...iconAriaProps,
      },
    })

    const endIconProps = useSlotProps({
      ownerState,
      externalSlotProps: slotProps?.endIcon,
      classNames: classes.endIcon,
      sx: styles.endIcon,
      additionalProps: {
        ...iconAriaProps,
      },
    })

    const loadingIcon = loading
      ? (spinner ?? <Icon spin component={LoadingOutlined} />)
      : null

    const startIcon = ((spinnerPlacement === 'start' && loading) ||
      startIconProp) && (
      <nex.span {...startIconProps}>
        {loading ? loadingIcon : startIconProp}
      </nex.span>
    )

    const endIcon = ((spinnerPlacement === 'end' && loading) ||
      endIconProp) && (
      <nex.span {...endIconProps}>
        {loading ? loadingIcon : endIconProp}
      </nex.span>
    )

    return (
      <Ripple disabled={disableRipple ?? disabled}>
        <nex.button {...rootProps}>
          {startIcon}
          {children}
          {endIcon}
        </nex.button>
      </Ripple>
    )
  },
)

Button.displayName = 'Button'
