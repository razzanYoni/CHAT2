function levenshetain_distance(s: string, t: string): number {

    // Initialize matrix of zeros of size (s.length + 1) x (t.length + 1)
    // distMatrix[i][j] represents the Levenshtein distance between the first i characters of s and the first j characters of t
    let distMatrix = new Array(s.length + 1).fill(0).map(() => new Array(t.length + 1).fill(0));


    // Fill in the first row of the matrix
    // The distance between the empty string and the first j characters of t is j
    for (let j = 1; j <= t.length; j++) {
        distMatrix[0][j] = j;
    }

    // Fill in the first column of the matrix
    // The distance between the first i characters of s and the empty string is i
    for (let i = 1; i <= s.length; i++) {
        distMatrix[i][0] = i;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= t.length; j++) {

            // If the last characters of the substrings match, the cost is 0
            let cost = 0;
            if (s[i - 1] !== t[j - 1]) {
                cost = 1;
            }

            distMatrix[i][j] = Math.min(
                distMatrix[i - 1][j] + 1, // deletion or insertion
                distMatrix[i][j - 1] + 1, // deletion or insertion
                distMatrix[i - 1][j - 1] + cost // substitution
            );
        }
    }

    return distMatrix[s.length][t.length];
}

export function percentage_similarity(s: string, t: string): number {
    return 1 - (levenshetain_distance(s, t) / Math.max(s.length, t.length));
}