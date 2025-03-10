export function addEventListener<
  N extends HTMLElement,
  K extends keyof HTMLElementEventMap,
>(
  node: N,
  event: K,
  cb: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: AddEventListenerOptions | boolean,
) {
  node.addEventListener<K>(event, cb, options)
  return () => {
    node.removeEventListener(event, cb, options)
  }
}
