import { PopperManager } from '../PopperManager'

describe('PopperManager', () => {
  let pm: PopperManager

  beforeEach(() => {
    pm = new PopperManager()
  })

  it('calls flush for all poppers except the provided id', () => {
    const flushA = jest.fn()
    const flushB = jest.fn()
    const flushC = jest.fn()

    pm.register('a', flushA)
    pm.register('b', flushB)
    pm.register('c', flushC)

    pm.flush('b')

    expect(flushA).toHaveBeenCalledTimes(1)
    expect(flushC).toHaveBeenCalledTimes(1)
    expect(flushB).not.toHaveBeenCalled()
  })

  it('registering the same id twice does not overwrite the original flush', () => {
    const first = jest.fn()
    const second = jest.fn()

    pm.register('id', first)
    pm.register('id', second) // should be ignored

    // flush with a different id should invoke the registered handler
    pm.flush('other')

    expect(first).toHaveBeenCalledTimes(1)
    expect(second).not.toHaveBeenCalled()
  })

  it('unregister removes a popper so it is not flushed', () => {
    const flushA = jest.fn()
    const flushB = jest.fn()
    const flushC = jest.fn()

    pm.register('a', flushA)
    pm.register('b', flushB)
    pm.register('c', flushC)

    pm.unregister('c')

    pm.flush('a')

    expect(flushB).toHaveBeenCalledTimes(1)
    expect(flushA).not.toHaveBeenCalled()
    expect(flushC).not.toHaveBeenCalled()
  })

  it('unregistering a non-existent id does not throw', () => {
    expect(() => pm.unregister('non-existent')).not.toThrow()
  })
})
