/**
 * @param a number pertama yang akan dioperasikan
 * @param b number kedua yang akan dioperasikan
 * @param op char operator yang akan digunakan
 * @returns number hasil operasi a dan b dengan operator op
 * 
 */
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

/**
 * @param c char yang akan dicek apakah merupakandot
 * @returns boolean true jika c merupakan dot, false jika tidak
 */
function isDot(c: string): boolean {
  return c === '.'
}

/**
 * @param c char yang akan dicek apaha merupakan digit dengan dot 
 * @returns boolean true jika c merupakan digit dengan dot, false jika tidak
 */
function isDigitWithDot(c: string): boolean {
  let RegExp = /^[0-9.]*\.[0-9.]*$/;
  return RegExp.test(c);
}

/**
 * @param c char yang akan dicek apakah merupakan operator
 * @returns boolean true jika c merupakan operator, false jika tidak
 */
function isOperator(c: string): boolean {
  return '+-*/^'.indexOf(c) !== -1
}
/**
 * @param c char yang akan dicek apakah merupakan parenthesis
 * @returns boolean true jika c merupakan parenthesis, false jika tidak
 */
function isParenthesis(c: string): boolean {
  return '()'.indexOf(c) !== -1
}
/**
 * @param c char yang akan dicek apakah merupakan digit
 * @returns boolean true jika c merupakan digit, false jika tidak
 */
function isDigit(c: string): boolean {
  let RegExp = /^[0-9]+$/
  return RegExp.test(c)
}

/**
 * @param char yang akan dicek apakah merupakan number termaksud dot 
 * @returns boolean true jika c merupakan number termasuk dot, false jika tidak
 */
function isNumber(c: string): boolean {
  let RegExp = /^[0-9.]+$/
  return RegExp.test(c)
}

/**
 * @param c char yang akan dicek apakah merupakan left parenthesis
 * @returns boolean true jika c merupakan left parenthesis, false jika tidak
 */
function isLeftParenthesis(c: string): boolean {
  return c === '('
}

/** 
 * @param c char yang akan dicek apakah merupakan right parenthesis
 * @returns booelean true jika c merupakan right parenthesis, false jika tidak
 */
function isRightParenthesis(c: string): boolean {
  return c === ')'
}

/**
 * Sebuah fungsi yang mengembalikan input precedence dari sebuah operator yang valid
 * precedence akan menentukan urutan operasi dari operator
 * 
 * @param c char yang akan dicari input precedence nya
 * @returns input precedence dari c
 */
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

/**
 * Sebuah fungsi yang mengembalikan stack precedence dari sebuah operator yang valid
 * precedence akan menentukan urutan operasi dari operator
 * 
 * @param c char yang akan dicari stack precedence nya
 * @returns stastack precedence dari c
 */
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
/**
 * Sebuah fungsi yang memproses masukan dengan notasi infix dalam bentuk string menjadi
 * array of string dengan masing-masing elemen merupakan number, operator, atau parenthesis
 * 
 * fungsi juga melakukan pengecekan apakah masukan valid atau tidak
 * @param exp string math expression dalam bentuk infix
 * @returns array of string yang merupakan hasil dari pemrosesan exp
 */
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
      /* 
      pemrosesan jika c merupakan digit
      apabila karakter sebelumnya merupakan digit atau dot, maka c akan digabungkan dengan digit sebelumnya
      */

      if (result.length !== 0 && isDigit(result[result.length - 1])) {
        result[result.length - 1] += c
      } else if (result.length !== 0 && isDot(result[result.length - 1])) {
        // Kasus karakter sebelumnya hanya dot, sehingga numberCount masih diincrement
        dotCount = 0;
        result[result.length - 1] += c
        numberCount++
      } else if (result.length !== 0 && isDigitWithDot(result[result.length - 1])) {
        dotCount = 0;
        result[result.length - 1] += c
      } else if (result.length !== 0 && isRightParenthesis(result[result.length - 1])) {
        throw new Error('Cannot put number immediately after right parenthesis')
      } else {
        // Kasus karakter sebelumnya merupakan operator atau left parenthesis
        result.push(c)
        numberCount++
      }
    } else if (isDot(c)) {
      if (result.length !== 0 && isDigitWithDot(result[result.length - 1])) {
        // Kasus sudah ada dot sebelumnya
        throw new Error('Invalid dot position')
      }
      if (result.length !== 0 && isDigit(result[result.length - 1])) {
        result[result.length - 1] += c
      } else if (result.length !== 0 && isRightParenthesis(result[result.length - 1])) {
        throw new Error('Cannot put dot after right parenthesis')
      } else {
        result.push(c)
        dotCount++
      }
    } else if (isOperator(c)) {
      if (dotCount > 0) {
        throw new Error('Cannot have only dot as operand')
      }
      result.push(c)
      operatorCount++
    } else if (isLeftParenthesis(c)) {
      if (result.length !== 0 && isRightParenthesis(result[result.length - 1])) {
        throw new Error('Invalid parenthesis position')
      }
      if (result.length !== 0 && isNumber(result[result.length - 1])) {
        throw new Error('Cannot have number or dot before left parenthesis')
      }
      if (dotCount > 0) {
        throw new Error('Cannot have only dot as operand')
      }
      mapNumberCount[leftParanthesisCount] = numberCount
      mapOpCount[leftParanthesisCount] = operatorCount
      leftParanthesisCount++
      result.push(c)
    } else if (isRightParenthesis(c)) {
      if (dotCount > 0) {
        throw new Error('Cannot have only dot as operand')
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
/**
 * Melakukan konversi dari infix ke postfix
 * 
 * @param exp array of string yang merupakan hasil dari pemrosesan exp
 * @returns array of string yang merupakan hasil dari konversi exp ke postfix
 */
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

/**
 * Evaluasi math expression yang sudah dalam bentuk postfix
 * 
 * @param exp array of string yang sudah dalam bentuk postfix
 * @returns integer hasil evaluasi dari postfix
 */
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