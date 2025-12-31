import { getTabbable } from '../getTabbable'

describe('getTabbable', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('should return empty array when no tabbable elements exist', () => {
    container.innerHTML = '<div>No tabbable elements</div>'

    const result = getTabbable(container)

    expect(result).toEqual([])
  })

  it('should return tabbable elements in correct order', () => {
    container.innerHTML = `
      <input id="input1" />
      <button id="button1">Button</button>
      <a href="#" id="link1">Link</a>
    `

    const result = getTabbable(container)

    expect(result).toHaveLength(3)
    expect(result[0].id).toBe('input1')
    expect(result[1].id).toBe('button1')
    expect(result[2].id).toBe('link1')
  })

  it('should exclude elements with tabindex=-1', () => {
    container.innerHTML = `
      <input id="input1" />
      <button id="button1" tabindex="-1">Button</button>
      <a href="#" id="link1">Link</a>
    `

    const result = getTabbable(container)

    expect(result).toHaveLength(2)
    expect(result.find((el) => el.id === 'button1')).toBeUndefined()
  })

  it('should order elements by tabindex then document order', () => {
    container.innerHTML = `
      <input id="input1" tabindex="3" />
      <button id="button1" tabindex="1">Button</button>
      <a href="#" id="link1" tabindex="2">Link</a>
      <a href="#" id="link2" tabindex="2">Link</a>
      <input id="input2" />
    `

    const result = getTabbable(container)

    expect(result).toHaveLength(5)
    expect(result[0].id).toBe('button1') // tabindex 1
    expect(result[1].id).toBe('link1') // tabindex 2
    expect(result[2].id).toBe('link2') // tabindex 2
    expect(result[3].id).toBe('input1') // tabindex 3
    expect(result[4].id).toBe('input2') // tabindex 0 (default)
  })

  it('should exclude disabled elements', () => {
    container.innerHTML = `
      <input id="input1" />
      <button id="button1" disabled>Button</button>
      <input id="input2" disabled />
    `

    const result = getTabbable(container)

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('input1')
  })

  it('should exclude hidden inputs', () => {
    container.innerHTML = `
      <input id="input1" type="text" />
      <input id="input2" type="hidden" />
      <input id="input3" type="password" />
    `

    const result = getTabbable(container)

    expect(result).toHaveLength(2)
    expect(result.find((el) => el.id === 'input2')).toBeUndefined()
  })

  it('should handle radio buttons correctly', () => {
    container.innerHTML = `
      <input id="radio1" type="radio" name="group1" />
      <input id="radio2" type="radio" name="group1" checked />
      <input id="radio3" type="radio" name="group2" />
    `

    const result = getTabbable(container)

    expect(result).toHaveLength(2)
    expect(result.find((el) => el.id === 'radio2')).toBeDefined()
    expect(result.find((el) => el.id === 'radio3')).toBeDefined()
    /**
     * According to web accessibility standards and keyboard navigation conventions,
     * when multiple radio buttons belong to the same group (same name attribute),
     * only one radio button in that group should be tabbable at a time.
     */
    expect(result.find((el) => el.id === 'radio1')).toBeUndefined()

    container.innerHTML = `
      <input id="radio1" type="radio" name="group1" />
      <input id="radio2" type="radio" name="group1" />
      <input id="radio3" type="radio" name="group1" />
    `
    const result2 = getTabbable(container)
    expect(result2).toHaveLength(1)
    expect(result2[0].id).toBe('radio1')

    container.innerHTML = `
      <input id="radio1" type="radio" />
      <input id="radio2" type="radio" name="group1" />
      <input id="radio3" type="radio" name="group1" />
    `
    const result3 = getTabbable(container)
    expect(result3).toHaveLength(2)
    expect(result3[0].id).toBe('radio1')
    expect(result3[1].id).toBe('radio2')
  })

  it('should include audio and video controls', () => {
    container.innerHTML = `
      <audio id="audio1" controls></audio>
      <video id="video1" controls></video>
      <audio id="audio2"></audio>
    `

    const result = getTabbable(container)

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('audio1')
    expect(result[1].id).toBe('video1')
  })

  it('should include details elements', () => {
    container.innerHTML = `
      <details id="details1">
        <summary id="summary1">Summary</summary>
        Content
      </details>
    `

    const result = getTabbable(container)

    expect(result.length).toBeGreaterThan(0)
    expect(result.find((el) => el.id === 'summary1')).toBeDefined()
  })

  it('should exclude inert elements', () => {
    container.innerHTML = `
      <input id="input1" />
      <button id="button1" inert>Button</button>
      <a href="#" id="link1">Link</a>
    `

    const result = getTabbable(container)

    expect(result).toHaveLength(2)
    expect(result.find((el) => el.id === 'button1')).toBeUndefined()
  })
})
