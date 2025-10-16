import {
  renderWithNexUIProvider,
  testComponentStability,
  testRefForwarding,
  testSlotPropsForwarding,
  testClassNamesForwarding,
  testRootClassName,
} from '~/tests/shared'
import { CardHeader } from '../index'
import { cardHeaderClasses } from './classes'

const slots = ['content', 'title', 'subtitle'] as const

describe('CardHeader', () => {
  testComponentStability(<CardHeader title='Title' subtitle='Subtitle' />)

  testRefForwarding(<CardHeader />)

  testRootClassName(<CardHeader />)

  testSlotPropsForwarding(
    <CardHeader title='Title' subtitle='Subtitle' />,
    slots,
    {
      content: { className: 'test-content' },
      subtitle: { className: 'test-subtitle' },
      title: { className: 'test-title' },
    },
    cardHeaderClasses,
  )

  testClassNamesForwarding(
    <CardHeader title='Title' subtitle='Subtitle' />,
    slots,
    {
      content: 'test-content',
      title: 'test-title',
      subtitle: 'test-subtitle',
    },
    cardHeaderClasses,
  )

  it('should render with default props', () => {
    const { container } = renderWithNexUIProvider(<CardHeader />)

    const cardHeaderRoot = container.firstElementChild
    expect(cardHeaderRoot).toHaveClass(cardHeaderClasses.root)

    expect(cardHeaderRoot).toMatchSnapshot()
  })

  it('should render title', () => {
    const { getByText } = renderWithNexUIProvider(<CardHeader title='Title' />)

    const titleElement = getByText('Title')

    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveClass(cardHeaderClasses.title)
  })

  it('should render subtitle', () => {
    const { getByText } = renderWithNexUIProvider(
      <CardHeader subtitle='Subtitle' />,
    )

    const subtitleElement = getByText('Subtitle')

    expect(subtitleElement).toBeInTheDocument()
    expect(subtitleElement).toHaveClass(cardHeaderClasses.subtitle)
  })

  it('should render title and subtitle in the content element', () => {
    const { getByText, queryByClassName } = renderWithNexUIProvider(
      <CardHeader title='Title' subtitle='Subtitle' />,
    )

    const titleElement = getByText('Title')
    const subtitleElement = getByText('Subtitle')

    expect(titleElement).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
    expect(queryByClassName(cardHeaderClasses.content)).toBeInTheDocument()
  })

  it('should render avatar', () => {
    const { getByText } = renderWithNexUIProvider(
      <CardHeader avatar='Avatar' />,
    )

    expect(getByText('Avatar')).toBeInTheDocument()
  })

  it('should render action', () => {
    const { getByText } = renderWithNexUIProvider(
      <CardHeader action='Action' />,
    )

    expect(getByText('Action')).toBeInTheDocument()
  })

  it('should not render content slot when only avatar and action are provided', () => {
    const { queryByClassName } = renderWithNexUIProvider(
      <CardHeader avatar='Avatar' action='Action' />,
    )

    expect(queryByClassName(cardHeaderClasses.content)).not.toBeInTheDocument()
  })

  it('should have children override action, avatar, title, and subtitle when provided', () => {
    const { queryByText } = renderWithNexUIProvider(
      <CardHeader
        title='Title'
        subtitle='Subtitle'
        avatar='Avatar'
        action='Action'
      >
        Children
      </CardHeader>,
    )

    expect(queryByText('Title')).not.toBeInTheDocument()
    expect(queryByText('Subtitle')).not.toBeInTheDocument()
    expect(queryByText('Avatar')).not.toBeInTheDocument()
    expect(queryByText('Action')).not.toBeInTheDocument()
    expect(queryByText('Children')).toBeInTheDocument()
  })
})
