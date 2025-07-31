import { ModalManager } from '../ModalManager'

describe('ModalManager', () => {
  let modalManager: ModalManager

  beforeEach(() => {
    modalManager = new ModalManager()
  })

  it('should register a modal only once', () => {
    const modal = 'modal-id'
    const index = modalManager.register(modal)
    expect(index).toBe(0)

    expect(modalManager.register(modal)).toBe(index)
  })

  it('should unregister a modal', () => {
    const modal = 'modal-id'
    modalManager.register(modal)
    const index = modalManager.unregister(modal)
    expect(index).toBe(0)

    expect(modalManager.unregister(modal)).toBe(-1)
  })

  it('should check if a modal is the topmost modal', () => {
    const modal1 = 'modal-id-1'
    const modal2 = 'modal-id-2'

    modalManager.register(modal1)
    expect(modalManager.isTopmostModal(modal1)).toBe(true)

    modalManager.register(modal2)
    expect(modalManager.isTopmostModal(modal1)).toBe(false)
    expect(modalManager.isTopmostModal(modal2)).toBe(true)

    modalManager.unregister(modal2)
    expect(modalManager.isTopmostModal(modal1)).toBe(true)
  })

  it('should subscribe and unsubscribe to modal mount/unregister', () => {
    const modal1 = 'modal-id-1'
    const modal2 = 'modal-id-2'
    const modal3 = 'modal-id-3'

    const callback = jest.fn()

    modalManager.register(modal1)
    modalManager.register(modal2)
    modalManager.register(modal3)

    const unsubscribe = modalManager.subscribe(callback)

    expect(callback).toHaveBeenCalledTimes(0)

    modalManager.mount(modal1)
    expect(callback).toHaveBeenCalledTimes(1)
    modalManager.mount(modal2)
    modalManager.mount(modal3)
    expect(callback).toHaveBeenCalledTimes(3)

    modalManager.unregister(modal3)
    expect(callback).toHaveBeenCalledTimes(4)

    unsubscribe()
    modalManager.unregister(modal2)
    expect(callback).toHaveBeenCalledTimes(4)
  })

  it('should not call listeners if modal is not registered', () => {
    const modal = 'modal-id'
    const callback = jest.fn()

    modalManager.subscribe(callback)

    modalManager.mount(modal)
    expect(callback).toHaveBeenCalledTimes(0)

    modalManager.unregister(modal)
    expect(callback).toHaveBeenCalledTimes(0)
  })
})
