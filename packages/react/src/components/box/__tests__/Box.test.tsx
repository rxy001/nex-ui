import {
  testComponentStability,
  testRefForwarding,
  testRootClassName,
} from '~/tests/shared'
import { Box } from '../index'

describe('Box', () => {
  testComponentStability(<Box />)

  testRefForwarding(<Box />)

  testRootClassName(<Box />)
})
