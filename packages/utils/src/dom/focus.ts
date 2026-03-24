export function focus(
  element: HTMLElement | null | undefined,
  preventScroll = true,
) {
  if (element && typeof element.focus === 'function') {
    if (globalThis.document?.activeElement === element) return
    element.focus({ preventScroll })
  }
}
