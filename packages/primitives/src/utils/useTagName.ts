import { useLayoutEffect, useState } from 'react'

export function useTagName(
  ref: React.RefObject<HTMLElement | null>,
  type?: string,
) {
  const [tagName, setTagName] = useState(type)

  // We intentionally run after every commit so ref.current DOM swaps are observed.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const nextTagName = ref.current?.tagName.toLowerCase() || type
    setTagName((prevTagName) =>
      prevTagName === nextTagName ? prevTagName : nextTagName,
    )
  })

  return tagName
}
