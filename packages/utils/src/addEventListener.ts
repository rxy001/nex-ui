type EventMapFor<N> = N extends Window
  ? WindowEventMap
  : N extends HTMLElement
    ? HTMLElementEventMap
    : never

export function addEventListener<
  N extends Window | HTMLElement,
  K extends keyof EventMapFor<N>,
>(
  node: N,
  event: K,
  cb: (this: N, ev: EventMapFor<N>[K]) => any,
  options?: AddEventListenerOptions | boolean,
): () => void {
  node.addEventListener(event as string, cb as EventListener, options)
  return () => {
    node.removeEventListener(event as string, cb as EventListener, options)
  }
}
