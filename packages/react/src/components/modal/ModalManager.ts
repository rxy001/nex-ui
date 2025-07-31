type Modal = string

/**
 * > The aria-modal property introduced by ARIA 1.1 replaces aria-hidden
 * > for informing assistive technologies that content outside a dialog is inert.
 * https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * so we may not need to set `aria-hidden` to each element containing a portion of the inert layer.
 */

/**
 * The stack that stores modals follows the rule that the first opened modal is pushed onto the stack first.
 * Therefore, register is called during rendering rather than in useEffect to ensure the correctness of the order.
 * Whenever a modal is mounted to or unmounted from the DOM, all subscribers will be notified.
 * After receiving the notification, modals will update AriaHidden and overflow according to their order in the stack.
 *
 * registering order is important. In the case of nested modals
 *
 * <Modal defaultOpen>
 *   <Modal defaultOpen>
 *   </Modal>
 * </Modal>
 *
 * the children's useEffect is called before the parent's useEffect.
 */
export class ModalManager {
  private modals: Array<Modal> = []
  private listeners: Set<() => void> = new Set()

  register(modal: Modal) {
    let modalIndex = this.modals.indexOf(modal)
    if (modalIndex !== -1) {
      return modalIndex
    }

    modalIndex = this.modals.length
    this.modals.push(modal)

    return modalIndex
  }

  // Mount is called after the Modal has been mounted to the DOM.
  mount(modal: Modal) {
    const modalIndex = this.modals.indexOf(modal)

    if (modalIndex === -1) {
      return
    }

    this.listeners.forEach((listener) => listener())
  }

  unregister(modal: Modal) {
    const modalIndex = this.modals.indexOf(modal)
    if (modalIndex === -1) {
      return modalIndex
    }

    this.modals.splice(modalIndex, 1)

    this.listeners.forEach((listener) => listener())

    return modalIndex
  }

  isTopmostModal(modal: Modal) {
    return (
      this.modals.length > 0 && this.modals[this.modals.length - 1] === modal
    )
  }

  subscribe = (callback: () => void) => {
    this.listeners.add(callback)

    return () => {
      this.listeners.delete(callback)
    }
  }
}

const modalManager = new ModalManager()

export const useModalManager = () => modalManager
