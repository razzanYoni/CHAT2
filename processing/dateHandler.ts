
/**
 * Mengecek apakah text merupakan pertanyaan tentang tanggal, jika iya maka akan mengembalikan tanggal yang dimaksud
 * jika tidak maka akan mengembalikan 0. Apabila sudah pasti merupakan date question, tetapi tanggal yang dimaksud tidak valid
 * maka akan mengembalikan string yang berisi pesan error
 * 
 * @param text string yang akan dicek apakah merupakan date question
 * @returns list yang berisi boolean apakah text merupakan date question dan string hasil dari date question
 */
export function dateQuestionHandler(text: string): [boolean, string] {
  let dateQuestion: RegExp = /^(\s*(kapan|hari\s+apa)?\s*(\d{1,2})\/(\d{1,2})\/(\d{1,5})[\s\?]*)$/gi;

  let isDateQuestion = dateQuestion.test(text);
  dateQuestion.lastIndex = 0;
  let date = dateQuestion.exec(text);

  if (!(isDateQuestion && date)) {
    // bukan date question
    return [false, '0'];
  }

  // memisahkan tanggal, bulan, dan tahun dengan capture group regex
  let dateParsed = [parseInt(date[3]), parseInt(date[4]), parseInt(date[5])];

  let [isValid, massage] = validateDate(dateParsed);
  if (!isValid) {
    // sebuah date question tetapi tanggal yang dimaksud tidak valid
    return [false, massage];
  } else {
    // sebuah date question dan tanggal yang dimaksud valid
    return [true, gaussAlgorithm(dateParsed)];

  }

}

function validateDate(date: number[]): [boolean, string] {
  let day = date[0];
  let month = date[1];
  let year = date[2];

  // check if year is valid
  if (year < 0 || year > 99999) {
    return [false, 'Invalid year (Max 5 digit)'];
  }

  // check if month if valid
  if (month < 1 || month > 12) {
    return [false, 'Invalid month'];
  }

  // check if day is valid
  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  if (day < 1 || day > monthLength[month - 1]) {
    return [false, 'Invalid day'];
  }

  // check if date is valid
  if (year < 1582 || (year === 1582 && month < 10) || (year === 1582 && month === 10 && day < 15)) {
    return [false, 'Only consider Gregorian calendar after 15 October 1582'];
  }

  return [true, ''];

}
/**
 * Sebuah algoritma gauss yang akan mengembalikan string berupa hari dari tanggal yang dimaksud, asumsi
 * tanggal yang dimaksud valid dan menggunakan Gregorian calendar setelah 15 Oktober 1582
 * 
 * @param date array of string yang berisi tanggal, bulan, dan tahun
 * @returns string berupa hari dari tanggal yang dimaksud
 */
function gaussAlgorithm(date: number[]): string {
  let day = date[0];
  let month = date[1];
  let year = date[2];

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    // leap year
    var monthOffsetTable = [0, 3, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
  } else {
    // not leap year 
    var monthOffsetTable = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
  }

  let monthOffset = monthOffsetTable[month - 1];

  let dayIndex = (day + monthOffset + 5 * ((year - 1) % 4) + 4 * ((year - 1) % 100) + 6 * ((year - 1) % 400)) % 7;

  let dayName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  return "Tanggal " + day + '/' + month + '/' + year + " adalah hari " + dayName[dayIndex];
}