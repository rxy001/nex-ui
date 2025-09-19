import '@testing-library/jest-dom'
import { createSerializer, matchers } from '@emotion/jest'
import { MotionGlobalConfig } from 'motion/react'
import './jest-matchers'

expect.addSnapshotSerializer(createSerializer({ includeStyles: true }))
expect.extend(matchers)
expect.extend({
  toHaveDataAttribute(received: HTMLElement, attr: string, value?: string) {
    const dataAttr = `data-${attr}`
    const hasAttr = received.hasAttribute(dataAttr)

    if (value !== undefined) {
      const actualValue = received.getAttribute(dataAttr)
      const pass = hasAttr && actualValue === value

      return {
        message: () =>
          `expected element to have ${dataAttr}="${value}", but got ${dataAttr}="${actualValue}"`,
        pass,
      }
    }

    return {
      message: () => `expected element to have ${dataAttr} attribute`,
      pass: hasAttr,
    }
  },
})

MotionGlobalConfig.skipAnimations = true

Promise.withResolvers = (() => {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}) as unknown as typeof Promise.withResolvers

// react-m isn't working properly in the test environment, and it's unclear where the issue lies.
jest.mock('motion/react-m', () => {
  const module = jest.requireActual('motion/react')

  const commonTags = [
    'div',
    'a',
    'span',
    'button',
    'section',
    'ul',
    'li',
    'p',
    'h1',
    'path',
    'svg',
  ]

  return {
    __esModule: true,
    // motion is a proxy.
    ...Object.fromEntries(commonTags.map((tag) => [tag, module.motion[tag]])),
  }
})
