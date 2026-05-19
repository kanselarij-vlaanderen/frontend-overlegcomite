export default function datetimeFormat(dateTime) {
  if (!dateTime) {
    return dateTime;
  }

  return dateTime.toLocaleString()
}
