export default function thousandSeparator(number: number, locale = "en") {
  return number.toLocaleString(locale);
}
