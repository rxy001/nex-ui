import '@testing-library/jest-dom'
import { createSerializer, matchers } from '@emotion/jest'
import { MotionGlobalConfig } from 'motion/react'

expect.addSnapshotSerializer(createSerializer({ includeStyles: true }))
expect.extend(matchers)

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
