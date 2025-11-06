export const isFocusVisible = (element: Element): boolean => {
  try {
    return element.matches(':focus-visible')
  } catch {
    /* empty */
  }

  // istanbul ignore next
  return false
}
