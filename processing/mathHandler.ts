import { processInfix, infixToPostfix, evaluatePostfix } from './calculator';


function bracketMatcher(text: string): boolean {

  let stack: string[] = [];

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '(') {
      stack.push("(");
    } else if (text[i] === ')') {
      if (stack.length === 0) {
        return false;
      } else {
        stack.pop();
      }
    }
  }
  return stack.length === 0;
}
export function mathQuestionHandler(text: string): [boolean, string] {
  let mathQuestion: RegExp = /^((hitung|hasil|berapa)?\s*([0-9\+\-*/^\s\(\)\.]+)(=?[\?\s]*))$/gi;

  let isMath = mathQuestion.test(text);
  mathQuestion.lastIndex = 0;
  let math = mathQuestion.exec(text);

  if (!(isMath && math)) {
    return [false, '0'];
  }

  let mathExp = math[3].replace(/\s/g, "");

  if (!bracketMatcher(mathExp)) {
    return [false, 'Invalid bracket'];
  }
  try {
    let processedInfix = processInfix(mathExp);

    let postfix = infixToPostfix(processedInfix);

    let result = evaluatePostfix(postfix);

    return [true, result.toString()];
  } catch (error) {
    let message = "Invalid expression";
    if (error instanceof Error) message = error.message;

    return [false, message];
  }
}