function formatDate(date: string): string {
  const [extractedDate, ...rest] = date.split('T');
  return extractedDate.split('-').reverse().join('/');
}

export default formatDate;
