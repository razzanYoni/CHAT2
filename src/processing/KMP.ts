
/**
 * 
 * @param pattern string yang akan dicari border functionnya
 * @returns border function dari pattern
 */
function computeBorder(pattern: string) {
  const border = new Array(pattern.length).fill(0);
  let i = 1;
  let j = 0;
  while (i < pattern.length) {
    /* Kondisi awal pada tahap ini adalah P[0..j-1] sama dengan P[i-j..i-1] jika j > 0. */
    if (pattern[i] === pattern[j]) {
      border[i] = j + 1;
      i++;
      j++;
    } else if (j > 0) {
      j = border[j - 1];
      /* Hal ini dilakukan karena pada tahap ini, kita sudah 
      mengetahui bahwa karakter pada indeks j-1 sama dengan 
      karakter pada indeks i-1, j-2 sama dengan i-2, dst.
      
      Karena kita sudah dapatkan prefix yang juga suffix 
      terpanjang pada border[j-1], maka gunakan border[j-1] 
      sebagai nilai awal untuk j.

      Perhatikan untuk nilai baru j, tetap terjaga kondisi
      bahwa karakter pada indeks j-1 sama dengan karakter 
      pada indeks i-1, j-2 sama dengan i-2, dst.*/
    } else {
      i++;
    }
  }
  return border;
}
/**
 * 
 * @param text string yang akan dicari patternnya
 * @param pattern string yang akan dicari di text
 * @returns mengembalikan indeks pertama dari pattern di text, -1 jika tidak ditemukan
 */
export function KMP(text: string, pattern: string) {
  const border = computeBorder(pattern);
  let i = 0;
  let j = 0;
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      if (j === pattern.length - 1) {
        return i - j;
      }
      i++;
      j++;
    } else if (j > 0) {
      j = border[j - 1];
    } else {
      i++;
    }
  }
  return -1;
}