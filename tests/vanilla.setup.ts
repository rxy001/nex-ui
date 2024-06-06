import '@vanilla-extract/css/disableRuntimeStyles'

import { jest } from '@jest/globals'

jest.mock('../packages/theme/src/utils')

// eslint-disable-next-line import/first, import/no-relative-packages
import { recipe } from '../packages/theme/src/utils'

// @ts-ignore
recipe.mockImplementation(() => () => '')
