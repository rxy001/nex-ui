const images: HTMLImageElement[] = []
const originalImage = global.Image

export const mockGlobalImage = (status: 'loaded' | 'error' | 'loading') => {
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

        if (status === 'loading') {
          images.push(this)
        }
      },
    })

    return imageMock as HTMLImageElement
  }) as jest.MockedClass<typeof Image>
}

export function restoreGlobalImage() {
  global.Image = originalImage
}

export function flushMockedImages(status: 'loaded' | 'error') {
  const imagesToFlush = images.splice(0, images.length)
  imagesToFlush.forEach((image) => {
    if (status === 'loaded' && image.onload) {
      image.onload.call(image, new Event('load'))
    } else if (status === 'error' && image.onerror) {
      image.onerror.call(
        image,
        new ErrorEvent('error', { message: 'Image failed to load' }),
      )
    }
  })
}
