'use client'

import type { Dispatch, RefObject, SetStateAction } from 'react'
import { useEffect, useId, useState } from 'react'

function isFocusVisible(element: Element): boolean {
  try {
    return element.matches(':focus-visible')
  } catch (error) {
    // Do not warn on jsdom tests, otherwise all tests that rely on focus have to be skipped
    // Tests that rely on `:focus-visible` will still have to be skipped in jsdom
    if (
      process.env.NODE_ENV !== 'production' &&
      !/jsdom/.test(window.navigator.userAgent)
    ) {
      console.warn(
        [
          'The `:focus-visible` pseudo class is not supported in this browser.',
          'Some components rely on this feature to work properly.',
        ].join('\n'),
      )
    }
  }

  return false
}

type UseFocusVisibleProps = {
  ref: RefObject<HTMLElement | null>
}

let mounted = false

const refs = new Map<
  string,
  [RefObject<HTMLElement | null>, Dispatch<SetStateAction<boolean>>]
>()

const handler = () => {
  refs.forEach(([ref, setFocusVisible]) => {
    if (ref.current) {
      setFocusVisible(isFocusVisible(ref.current))
    } else {
      setFocusVisible(false)
    }
  })
}

function setGlobalListeners() {
  if (typeof window === 'undefined') {
    return
  }

  if (!mounted) {
    document.body.addEventListener('keydown', handler)
    document.body.addEventListener('focusin', handler)
    document.body.addEventListener('focusout', handler)
  }

  mounted = true
}

function removeGlobalListeners() {
  if (mounted) {
    document.body.removeEventListener('keydown', handler)
    document.body.removeEventListener('focusin', handler)
    document.body.removeEventListener('focusout', handler)
  }

  mounted = false
}

export const useFocusVisible = ({ ref }: UseFocusVisibleProps) => {
  const [focusVisible, setFocusVisible] = useState(false)
  const id = useId()

  setGlobalListeners()

  useEffect(() => {
    refs.set(id, [ref, setFocusVisible])
    return () => {
      refs.delete(id)
      if (refs.size === 0) removeGlobalListeners()
    }
  }, [id, ref])

  return [focusVisible, setFocusVisible]
}
