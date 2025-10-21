export class PopperManager {
  private poppers: Map<string, () => void> = new Map()

  register(popperId: string, flush: () => void) {
    if (this.poppers.has(popperId)) {
      return
    }

    this.poppers.set(popperId, flush)
  }

  flush(popperId: string) {
    this.poppers.forEach((flush, key) => {
      if (popperId !== key) {
        flush()
      }
    })
  }

  unregister(popperId: string) {
    if (this.poppers.has(popperId)) {
      this.poppers.delete(popperId)
    }
  }
}
