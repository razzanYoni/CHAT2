import { KMP } from './KMP'
import { BM } from './BM'
import { mathQuestionHandler } from './mathHandler'
import { dateQuestionHandler } from './dateHandler'
import { Dict } from '@chakra-ui/utils'
import { similarityScore } from './levenshtein'
import { addQnAHandler, deleteQnAHandler } from './editQnAHandler'

/**
 * 
 * @param pattern string masukan dari user
 * @param isKMP boolean apakah algoritma yang digunakan adalah KMP atau BM
 * @returns string jawaban dari pertanyaan user
 */
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
  } else if (!is_match && answer !== '0') {
    return "Math expression is invalid: " + answer
  }

  let isDeleteQnA: boolean = false;
  let questionToBeDeleted: string = "";

  // Handle apakah user ingin menghapus pertanyaan
  [is_match, questionToBeDeleted] = deleteQnAHandler(pattern)

  if (is_match) {
    isDeleteQnA = true;
    pattern = questionToBeDeleted;
  }

  let isAddQnA: boolean = false;
  let newQuestion: string = "";
  let newAnswer: string = "";

  if (!isDeleteQnA) {
    [is_match, newQuestion, newAnswer] = addQnAHandler(pattern)

    if (is_match) {
      isAddQnA = true;
      pattern = newQuestion;
    }
  }

  let matchAlg = BM
  if (isKMP) {
    matchAlg = KMP
  }

  let questionAnwerDict: Dict<string>[] = []
  await fetch("/api/getReferences").then((res: any) => res.json()).then(({ data }: { data: any }) => { questionAnwerDict = data });

  for (let i = 0; i < questionAnwerDict.length; i++) {
    let question = Object.values(questionAnwerDict[i])[0]
    if (question.length != pattern.length) {
      continue
    }
    if (matchAlg(question, pattern) != -1) {
      if (isDeleteQnA) {
        deleteQnA(Number(Object.values(questionAnwerDict[i])[2]))
        return 'Question "' + questionToBeDeleted + '" has been deleted'
      } else if (isAddQnA) {
        return 'Question "' + newQuestion + '" already exists in database'
      }
      return Object.values(questionAnwerDict[i])[1]
    }
  }

  if (isDeleteQnA) {
    return 'Question "' + questionToBeDeleted + '" not found in database'
  } else if (isAddQnA) {
    addQnA(newQuestion, newAnswer)
    return 'Question "' + newQuestion + '" has been added to database'
  }

  let similarity: [number, number][] = []
  for (let i = 0; i < questionAnwerDict.length; i++) {
    let question = Object.values(questionAnwerDict[i])[0]
    similarity.push([similarityScore(question, pattern), i])
  }

  similarity.sort((a, b) => b[0] - a[0])

  if (similarity[0][0] >= 0.9) {
    return Object.values(questionAnwerDict[similarity[0][1]])[1]
  } else {
    let answerText = "Question not found in database.\n"
    answerText += "Did you mean:\n"
    for (let i = 0; i < 3 && i < similarity.length; i++) {
      answerText += "  " + (i + 1) + ". "
      answerText += Object.values(questionAnwerDict[similarity[i][1]])[0] + " ("
      answerText += (similarity[i][0] * 100).toFixed(2) + "% similar)\n"
    }
    return answerText
  }
}

async function deleteQnA(id_reference: Number) {
  await fetch(`/api/deleteReference?id_reference=${id_reference}`, {
    method: "DELETE"
  });
}

async function addQnA(newQuestion: string, newAnswer: string) {
  const newReference = {
    pertanyaan: newQuestion,
    jawaban: newAnswer
  };

  await fetch("/api/createReference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newReference)
  })
    .then((res) => res.json())
    .then(({ data }) => { console.log(data); });
}