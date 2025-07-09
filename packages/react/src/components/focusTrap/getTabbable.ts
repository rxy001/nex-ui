// https://github.com/focus-trap/tabbable/blob/master/src/index.js#L676
const candidateSelectors = [
  'input:not([inert])',
  'select:not([inert])',
  'textarea:not([inert])',
  'a[href]:not([inert])',
  'button:not([inert])',
  '[tabindex]:not(slot):not([inert])',
  'audio[controls]:not([inert])',
  'video[controls]:not([inert])',
  '[contenteditable]:not([contenteditable="false"]):not([inert])',
  'details>summary:first-of-type:not([inert])',
  'details:not([inert])',
]
const candidateSelector = candidateSelectors.join(',')

interface OrderedTabNode {
  documentOrder: number
  tabIndex: number
  node: HTMLElement
}

function isNonTabbableRadio(node: HTMLInputElement): boolean {
  if (node.tagName !== 'INPUT' || node.type !== 'radio') {
    return false
  }

  if (!node.name) {
    return false
  }

  const getRadio = (selector: string) =>
    node.ownerDocument.querySelector(`input[type="radio"]${selector}`)

  let roving = getRadio(`[name="${node.name}"]:checked`)

  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`)
  }

  return roving !== node
}

function isNodeMatchingSelectorFocusable(node: HTMLInputElement): boolean {
  if (
    node.disabled ||
    (node.tagName === 'INPUT' && node.type === 'hidden') ||
    isNonTabbableRadio(node)
  ) {
    return false
  }
  return true
}

function getTabIndex(node: HTMLElement): number {
  const tabindexAttr = parseInt(node.getAttribute('tabindex') || '', 10)

  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr
  }

  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // https://issues.chromium.org/issues/41283952
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.
  if (
    node.contentEditable === 'true' ||
    ((node.nodeName === 'AUDIO' ||
      node.nodeName === 'VIDEO' ||
      node.nodeName === 'DETAILS') &&
      node.getAttribute('tabindex') === null)
  ) {
    return 0
  }

  return node.tabIndex
}

export function getTabbable(root: HTMLElement): HTMLElement[] {
  const regularTabNodes: HTMLElement[] = []
  const orderedTabNodes: OrderedTabNode[] = []

  Array.from(root.querySelectorAll(candidateSelector)).forEach((node, i) => {
    const nodeTabIndex = getTabIndex(node as HTMLElement)

    if (
      nodeTabIndex === -1 ||
      !isNodeMatchingSelectorFocusable(node as HTMLInputElement)
    ) {
      return
    }

    if (nodeTabIndex === 0) {
      regularTabNodes.push(node as HTMLElement)
    } else {
      orderedTabNodes.push({
        documentOrder: i,
        tabIndex: nodeTabIndex,
        node: node as HTMLElement,
      })
    }
  })
  return orderedTabNodes
    .sort((a, b) =>
      a.tabIndex === b.tabIndex
        ? a.documentOrder - b.documentOrder
        : a.tabIndex - b.tabIndex,
    )
    .map((a) => a.node)
    .concat(regularTabNodes)
}
