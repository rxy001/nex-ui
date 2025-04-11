import '@testing-library/jest-dom'
import { createSerializer, matchers } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer({ includeStyles: true }))
expect.extend(matchers)
