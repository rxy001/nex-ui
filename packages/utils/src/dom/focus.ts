export const focus = (element: HTMLElement, preventScroll = true) => {
  if (element && typeof element.focus === 'function') {
    if (globalThis.document?.activeElement === element) return
    element.focus({ preventScroll })
  }
}
