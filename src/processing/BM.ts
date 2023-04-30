function computeLastOccurrence(pattern: string) {
    const lastOccurrence = new Map<string, number>()
    for (let i = 0; i < pattern.length; i++) {
        lastOccurrence.set(pattern[i], i)
    }
    return lastOccurrence
}

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
            i--
            j--
        } else {
            // if not match
            const last = lastOccurrence.get(text[i])
            i += pattern.length - Math.min(j, 1 + (last !== undefined ? last : -1))
            j = pattern.length - 1  // reset j
        }
    }
    return -1
}