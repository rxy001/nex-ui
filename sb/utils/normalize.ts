const createReadableMapper = () => {
  return (abbreviation: string) => {
    switch (abbreviation) {
      case 'xs':
        return 'Extra Small'
      case 'sm':
        return 'Small'
      case 'md':
        return 'Medium'
      case 'lg':
        return 'Large'
      case 'xl':
        return 'Extra Large'
      case 'full':
        return 'Full'
      case 'none':
        return 'None'
      default:
        return abbreviation
    }
  }
}

export const toReadableSize = createReadableMapper()

export const toReadableRadius = createReadableMapper()
