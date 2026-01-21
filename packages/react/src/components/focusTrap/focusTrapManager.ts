export class FocusTrapScope {
  paused: boolean = false

  pause() {
    this.paused = true
  }
  resume() {
    this.paused = false
  }
}

export class FocusTrapManager {
  private stack: FocusTrapScope[] = []

  register(focusTrap: FocusTrapScope) {
    const [activeFocusTrap] = this.stack

    if (focusTrap !== activeFocusTrap) {
      activeFocusTrap?.pause()
    }

    remove(this.stack, focusTrap)

    this.stack.unshift(focusTrap)
  }

  unregister(focusTrap: FocusTrapScope) {
    remove(this.stack, focusTrap)

    this.stack[0]?.resume()
  }
}

function remove<T>(array: T[], item: T) {
  const index = array.indexOf(item)
  if (index !== -1) {
    array.splice(index, 1)
  }
  return array
}
