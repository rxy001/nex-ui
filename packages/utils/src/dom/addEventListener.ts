type EventMapFor<N> = N extends Window
  ? WindowEventMap
  : N extends HTMLElement
    ? HTMLElementEventMap
    : N extends Document
      ? DocumentEventMap
      : never

export function addEventListener<
  N extends Window | HTMLElement | Document,
  K extends keyof EventMapFor<N>,
>(
  node: N,
  event: K | (string & {}),
  cb: (this: N, ev: EventMapFor<N>[K]) => any,
  options?: AddEventListenerOptions | boolean,
): () => void {
  node.addEventListener(event as string, cb as EventListener, options)
  return () => {
    node.removeEventListener(event as string, cb as EventListener, options)
  }
}
