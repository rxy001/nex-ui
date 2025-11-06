// istanbul ignore file

import { ownerDocument } from './ownerDocument'

export function ownerWindow(node: Node | undefined | null): Window {
  const doc = ownerDocument(node)
  return doc.defaultView || window
}
