import { useEffect, useRef } from 'react'

export const useIsUsingKeyboard = () => {
  const isUsingKeyboardRef = useRef(false)

  useEffect(() => {
    // Capture phase ensures we set the boolean before any side effects execute
    // in response to the key or pointer event as they might depend on this value.
    const handlePointer = () => (isUsingKeyboardRef.current = false)
    const handleKeyDown = () => {
      isUsingKeyboardRef.current = true
      document.addEventListener('pointerdown', handlePointer, {
        capture: true,
        once: true,
      })
      document.addEventListener('pointermove', handlePointer, {
        capture: true,
        once: true,
      })
    }
    document.addEventListener('keydown', handleKeyDown, { capture: true })
    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true })
      document.removeEventListener('pointerdown', handlePointer, {
        capture: true,
      })
      document.removeEventListener('pointermove', handlePointer, {
        capture: true,
      })
    }
  }, [])

  return isUsingKeyboardRef
}
