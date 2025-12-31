'use client'

import { chain, isValidNonFragmentElement, mergeRefs } from '@nex-ui/utils'
import { cloneElement } from 'react'
import { usePopper } from './PopperContext'
import type { ReactElement } from 'react'
import type { PopperTriggerProps } from './types'

export const PopperTrigger = ({
  children,
  elementProps,
  closeOnClick = true,
}: PopperTriggerProps) => {
  const { open, setOpen, delayOpen, referenceRef } = usePopper()

  if (!isValidNonFragmentElement(children)) {
    return children
  }

  const element = children as ReactElement<any>

  const handleClick = () => {
    if (!open) {
      delayOpen()
    } else if (closeOnClick) {
      setOpen(false)
    }
  }

  return cloneElement(element, {
    ...elementProps,
    onClick: chain(handleClick, element.props.onClick, elementProps?.onClick),
    ref: mergeRefs(referenceRef, element.props.ref, elementProps?.ref),
  })
}
