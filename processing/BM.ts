
/**
 * @param pattern string yang akan dicari tiap last occureance dari karakternya
 * @returns Map yang berisi last occurence dari tiap karakter pada pattern
 * 
 * I.S. pattern merupakan string yang tidak kosong
 * 
 * F.S. mengembalikan Map yang berisi last occurence dari tiap karakter pada pattern
 */
function computeLastOccurrence(pattern: string) {
  const lastOccurrence = new Map<string, number>()
  for (let i = 0; i < pattern.length; i++) {
    lastOccurrence.set(pattern[i], i)
  }
  return lastOccurrence
}

/**
 * 
 * @param text string yang akan dicari patternnya
 * @param pattern string yang akan dicari di text
 * @returns indeks pertama dari pattern di text, -1 jika tidak ditemukan
 * 
 * I.S. text dan pattern merupakan string yang tidak kosong
 * 
 * F.S. mengembalikan indeks pertama dari pattern di text, -1 jika tidak ditemukan
 */
export function BM(text: string, pattern: string) {
  const lastOccurrence = computeLastOccurrence(pattern)
  let i = pattern.length - 1
  let j = pattern.length - 1
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      // if match
      if (j === 0) {
        // if match and j is 0, then we found the pattern
        return i
      }
      // if match and j is not 0, then we continue to check the next character
      i--
      j--
    } else {
      // if not match
      const last = lastOccurrence.get(text[i])
      i += pattern.length - Math.min(j, 1 + (last !== undefined ? last : -1))
      // Dicar min(j, last) agar tidak out of bound ketika menggeser
      j = pattern.length - 1  // reset j
    }
  }
  return -1
}