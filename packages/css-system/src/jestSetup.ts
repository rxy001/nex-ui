import '@vanilla-extract/css/disableRuntimeStyles'
import { jest } from '@jest/globals'

jest.mock('./recipe', () => {
  const originalModule = jest.requireActual('./recipe')

  return {
    __esModule: true,
    // @ts-ignore
    ...originalModule,
    recipe: () => () => '',
  }
})
