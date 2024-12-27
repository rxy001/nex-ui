import { jest } from '@jest/globals'

export const mockGlobalImage = (status: 'loaded' | 'error') => {
  global.Image = jest.fn(() => {
    const imageMock: Partial<HTMLImageElement> = {}

    Object.defineProperty(imageMock, 'src', {
      set() {
        if (status === 'loaded' && imageMock.onload) {
          imageMock.onload.call(this as HTMLImageElement, new Event('load'))
          return
        }

        if (status === 'error' && imageMock.onerror) {
          imageMock.onerror.call(
            this as HTMLImageElement,
            new ErrorEvent('error', { message: 'Image failed to load' }),
          )
        }
      },
    })

    return imageMock as HTMLImageElement
  }) as jest.MockedClass<typeof Image>
}

export function restoreGlobalImage() {
  global.Image = window.Image
}
