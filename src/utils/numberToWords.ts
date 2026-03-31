const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertHundreds(n: number): string {
  if (n === 0) return '';
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
  return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + convertHundreds(n % 100) : '');
}

export function numberToWords(num: number): string {
  if (num === 0) return 'Zero';
  if (num < 0) return 'Minus ' + numberToWords(-num);

  const n = Math.round(num);
  let result = '';

  if (n >= 10000000) {
    result += convertHundreds(Math.floor(n / 10000000)) + ' Crore ';
  }
  const afterCrore = n % 10000000;
  if (afterCrore >= 100000) {
    result += convertHundreds(Math.floor(afterCrore / 100000)) + ' Lakh ';
  }
  const afterLakh = afterCrore % 100000;
  if (afterLakh >= 1000) {
    result += convertHundreds(Math.floor(afterLakh / 1000)) + ' Thousand ';
  }
  const afterThousand = afterLakh % 1000;
  if (afterThousand > 0) {
    result += convertHundreds(afterThousand);
  }

  return 'Rupees ' + result.trim() + ' Only';
}
