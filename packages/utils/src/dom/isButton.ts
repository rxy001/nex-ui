const buttonInputTypes = ['button', 'image', 'reset', 'submit']

export function isButton(element: { tagName: string; type?: string }) {
  const tagName = element.tagName.toLowerCase()
  if (tagName === 'button') return true
  if (tagName === 'input' && element.type) {
    return buttonInputTypes.includes(element.type)
  }
  return false
}
