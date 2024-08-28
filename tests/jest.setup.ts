import '@testing-library/jest-dom/jest-globals'
import { createSerializer } from '@emotion/jest'
import { expect } from '@jest/globals'

expect.addSnapshotSerializer(createSerializer({ includeStyles: false }))
