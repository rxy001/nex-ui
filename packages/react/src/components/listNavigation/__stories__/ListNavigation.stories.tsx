import { ListNavigation } from '../ListNavigation'
import { ListNavigationItem } from '../ListNavigationItem'
import './index.css'

const meta = {
  title: 'Utilities/ListNavigation',
  tags: ['nui-utility'],
}

export default meta

export function Default() {
  return (
    <div className='keyboard-navigation-story'>
      <ListNavigation>
        <ul>
          <ListNavigationItem id='apple'>
            <li>Apple</li>
          </ListNavigationItem>
          <ListNavigationItem id='banana'>
            <li>Banana</li>
          </ListNavigationItem>
          <ListNavigationItem id='cherry'>
            <li>Cherry</li>
          </ListNavigationItem>
          <ListNavigationItem id='date'>
            <li>Date</li>
          </ListNavigationItem>
          <ListNavigationItem id='elderberry'>
            <li>Elderberry</li>
          </ListNavigationItem>
        </ul>
      </ListNavigation>
    </div>
  )
}
