export function addEventListener(
  node: Window | Node,
  event: string,
  cb: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions | boolean,
) {
  node.addEventListener(event, cb, options)
  return () => {
    node.removeEventListener(event, cb, options)
  }
}
