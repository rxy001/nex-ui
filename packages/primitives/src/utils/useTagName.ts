import { useLayoutEffect, useState } from 'react'

export function useTagName(
  ref: React.RefObject<HTMLElement | null>,
  type?: string,
) {
  const [tagName, setTagName] = useState(type)

  useLayoutEffect(() => {
    setTagName(ref?.current?.tagName.toLowerCase() || type)
  }, [ref, type])

  return tagName
}
