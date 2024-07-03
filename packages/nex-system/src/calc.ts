type Operand = string | number | { reference: string }

type Operator = '+' | '-' | '*' | '/'

const toExpression = (operator: Operator, ...operands: Array<Operand>) =>
  operands.map(String).join(` ${operator} `).replace(/calc/g, '')

export const add = (...operands: Array<Operand>) =>
  `calc(${toExpression('+', ...operands)})`

export const subtract = (...operands: Array<Operand>) =>
  `calc(${toExpression('-', ...operands)})`

export const multiply = (...operands: Array<Operand>) =>
  `calc(${toExpression('*', ...operands)})`

export const divide = (...operands: Array<Operand>) =>
  `calc(${toExpression('/', ...operands)})`

export const negate = (x: number | string) => {
  const value = String(x)

  if (value != null && !Number.isNaN(parseFloat(value))) {
    return value.startsWith('-') ? value.slice(1) : `-${value}`
  }

  return multiply(value, -1)
}
