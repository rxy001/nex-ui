import { testComponentStability } from '~/tests/shared'
import { FocusTrap } from '../index'

describe('FocusTrap', () => {
  testComponentStability(
    <FocusTrap>
      <div />
    </FocusTrap>,
  )
})
