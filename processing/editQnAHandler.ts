export function addQnAHandler(pattern: string): [boolean, string, string] {
  let addQnARegex = /^(\s*tambahkan pertanyaan\s+(.*\S+.*)\s+dengan jawaban\s+(.*\S+.*)\s*)$/gi
  let isAddQnA = addQnARegex.test(pattern)
  addQnARegex.lastIndex = 0
  let addQnA = addQnARegex.exec(pattern)

  if (!(isAddQnA && addQnA)) {
    return [false, '0', '0']
  }
  let question = addQnA[2]
  let answer = addQnA[3]

  return [true, question, answer]
}

export function deleteQnAHandler(patter: string): [boolean, string] {
  let deleteQnAregex = /^(\s*hapus pertanyaan\s+(.*\S+.*)\s*)$/gi
  let isDeleteQnA = deleteQnAregex.test(patter)
  deleteQnAregex.lastIndex = 0
  let deleteQnA = deleteQnAregex.exec(patter)

  if (!(isDeleteQnA && deleteQnA)) {
    return [false, '0']
  }
  let question = deleteQnA[2]

  return [true, question]
}