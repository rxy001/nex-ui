import { mountTest } from '~/tests/shared'
import { FocusTrap } from '../index'

describe('FocusTrap', () => {
  mountTest(
    <FocusTrap>
      <div />
    </FocusTrap>,
  )
})
