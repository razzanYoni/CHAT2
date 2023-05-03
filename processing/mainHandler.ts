import { KMP } from './KMP'
import { BM } from './BM'
import { mathQuestionHandler } from './mathHandler'
import { dateQuestionHandler } from './dateHandler'
import { Dict } from '@chakra-ui/utils'
import { similarityScore } from './levenshtein'

export async function mainQuestionHandler(pattern: string, isKMP: boolean) {

  // Handle date question
  let [is_match, answer] = dateQuestionHandler(pattern)
  
  if (is_match) {
    return answer
  } else if (!is_match && answer !== '0') {
    return "Date is invalid: " + answer
  }

  // Handle math question
  [is_match, answer] = mathQuestionHandler(pattern)

  if (is_match) {
    return "The answer is " + answer
  }

  let matchAlg = BM
  if (isKMP) {
    matchAlg = KMP
  }

  let questionAnwerDict : Dict<string>[] = []
  await fetch("/api/getReferences").then((res:any) => res.json()).then(({ data } : { data : any }) => { questionAnwerDict = data });
  // console.log(questionAnwerDict)

  for (let i = 0; i < questionAnwerDict.length; i++) {
    let question = Object.keys(questionAnwerDict[i])[0]
    if (question.length != pattern.length) {
      continue
    }
    if (matchAlg(question, pattern) != -1) {
      return Object.values(questionAnwerDict[i])[0]
    }
  }

  let similarity: [number, number][] = []
  for (let i = 0; i < questionAnwerDict.length; i++) {
    let question = Object.keys(questionAnwerDict[i])[0]
    similarity.push([similarityScore(question, pattern), i])
  }

  similarity.sort((a, b) => b[0] - a[0])

  if (similarity[0][0] >= 0.9) {
    return Object.values(questionAnwerDict[similarity[0][1]])[0]
  } else {
    let answerText = "Question not found in database.\n"
    answerText += "Did you mean:\n"
    for (let i = 0; i < 3 && i < similarity.length; i++) {
      answerText += (similarity[i][0] * 100).toFixed(2) + " percent similar: "
      answerText += Object.keys(questionAnwerDict[similarity[i][1]])[0] + "\n"
    }
    return answerText
  }

}
