import { useEffect } from 'react'
import { addEventListener } from '@nex-ui/utils'
import { useLatest } from './useLatest'

function useEscapeKeydown(
  onEscapeKeyDownProp: (event: KeyboardEvent) => void,
  ownerDocument: Document = globalThis.document,
) {
  const onEscapeKeyDown = useLatest(onEscapeKeyDownProp)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscapeKeyDown.current?.(event)
      }
    }

    return addEventListener(ownerDocument, 'keydown', handleKeyDown, {
      capture: true,
    })
  }, [onEscapeKeyDown, ownerDocument])
}

export { useEscapeKeydown }
