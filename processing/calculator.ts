function op(a: number, b: number, op: string): number {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/':
      if (b == 0) {
        throw new Error('Cannot divide by zero')
      }
      return a / b
    case '^':
      if (a == 0 && b < 0) {
        throw new Error('Cannot divide by zero')
        return 1 / Math.pow(a, -b)
      }
      return a ** b
    default: throw new Error('Invalid operator')
  }
}
function isDot(c: string): boolean {
  return c === '.'
}

function isDigitWithDot(c: string): boolean {
  let RegExp = /^[0-9.]*\.[0-9.]*$/;
  return RegExp.test(c);
}

function isOperator(c: string): boolean {
  return '+-*/^'.indexOf(c) !== -1
}

function isParenthesis(c: string): boolean {
  return '()'.indexOf(c) !== -1
}

function isDigit(c: string): boolean {
  let RegExp = /^[0-9]+$/
  return RegExp.test(c)
}

function isNumber(c: string): boolean {
  let RegExp = /^[0-9.]+$/
  return RegExp.test(c)
}

function isLeftParenthesis(c: string): boolean {
  return c === '('
}

function isRightParenthesis(c: string): boolean {
  return c === ')'
}

function inputPrecedence(c: string): number {
  switch (c) {
    case '+':
    case '-':
      return 1
    case '*':
    case '/':
      return 3
    case '^':
      return 6
    case '(':
      return 9
    case ')':
      return 0
    default:
      throw new Error('Invalid operator')
  }
}

function stackPrecedence(c: string): number {
  switch (c) {
    case '+':
    case '-':
      return 2
    case '*':
    case '/':
      return 4
    case '^':
      return 5
    case '(':
      return 0
    default:
      throw new Error('Invalid operator')
  }
}

export function processInfix(exp: string): string[] {
  let dotCount = 0
  let numberCount = 0
  let operatorCount = 0
  let leftParanthesisCount = 0
  let mapNumberCount: { [key: string]: number } = {}
  let mapOpCount: { [key: string]: number } = {}

  let result: string[] = []
  for (let i = 0; i < exp.length; i++) {
    let c = exp[i]
    if (isDigit(c)) {
      if (result.length !== 0 && isDigit(result[result.length - 1])) {
        result[result.length - 1] += c
      } else if (result.length !== 0 && isDot(result[result.length - 1])) {
        result[result.length - 1] += c
        numberCount++
      } else if (result.length !== 0 && isDigitWithDot(result[result.length - 1])) {
        dotCount = 0;
        result[result.length - 1] += c
      } else {
        result.push(c)
        numberCount++
      }
    } else if (isDot(c)) {
      if (result.length !== 0 && isDigitWithDot(result[result.length - 1])) {
        throw new Error('Invalid dot position')
      }

      if (result.length !== 0 && isDigit(result[result.length - 1])) {
        result[result.length - 1] += c
      } else {
        result.push(c)
        dotCount++
      }
    } else if (isOperator(c)) {
      if (dotCount > 0) {
        throw new Error('Invalid dot position')
      }
      result.push(c)
      operatorCount++
    } else if (isLeftParenthesis(c)) {
      if (dotCount > 0) {
        throw new Error('Invalid dot position')
      }
      mapNumberCount[leftParanthesisCount] = numberCount
      mapOpCount[leftParanthesisCount] = operatorCount
      leftParanthesisCount++
      result.push(c)
    } else if (isRightParenthesis(c)) {
      if (dotCount > 0) {
        throw new Error('Invalid dot position')
      }
      leftParanthesisCount--
      let opInsideParenthesis = operatorCount - mapOpCount[leftParanthesisCount]
      let numInsideParenthesis = numberCount - mapNumberCount[leftParanthesisCount]
      if (numInsideParenthesis === 0) {
        throw new Error('Parenthesis without number')
      }

      if (opInsideParenthesis !== numInsideParenthesis - 1) {
        throw new Error('Number of operators and operands mismatch')
      }
      result.push(c)
    }
  }
  if (numberCount - operatorCount !== 1) {
    throw new Error('Number of operators and operands mismatch')
  }
  return result
}

export function infixToPostfix(exp: string[]): string[] {
  let postfix: string[] = []
  let stack: string[] = ['(']
  exp.push(')')
  for (let i = 0; i < exp.length; i++) {
    // Read the next character from the input
    let c = exp[i]

    // If the scanned character is an operand, add it to output.
    if (isNumber(c)) {
      postfix.push(c)

    } else if (isOperator(c) || isParenthesis(c)) {
      while (stackPrecedence(stack[stack.length - 1]) > inputPrecedence(c)) {
        if (isLeftParenthesis(stack[stack.length - 1])) {
          stack.pop()
          continue
        }
        let topStack = stack.pop()
        if (topStack) {
          postfix.push(topStack)
        }
      }
      if (isRightParenthesis(c)) {
        stack.pop()
        continue
      }
      stack.push(c)
    }
  }
  while (stack.length !== 0) {
    let topStack = stack.pop()
    if (topStack) {
      postfix.push(topStack)
    }
  }
  return postfix
}

export function evaluatePostfix(exp: string[]): number {
  let stack: number[] = []
  for (let i = 0; i < exp.length; i++) {
    let c = exp[i]
    if (isNumber(c)) {
      stack.push(parseFloat(c))
    } else if (isOperator(c)) {
      let b = stack.pop()
      let a = stack.pop()
      if (a === undefined || b === undefined) {
        throw new Error('Invalid expression')
      }
      try {
        stack.push(op(a, b, c))
      } catch (e) {
        throw e
      }
    }
  }
  return stack.pop() || 0
}