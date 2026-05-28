function makeFormat(style) {
  return Intl.DateTimeFormat(undefined, { dateStyle: style, timeStyle: style})
}

const FORMATS = {
  short: Intl.DateTimeFormat(undefined, {
    day: "numeric", month: "short", year: "2-digit",
    hour: "2-digit", minute: "2-digit"
  }),
  medium: makeFormat('medium'),
  long: makeFormat('long'),
  full: makeFormat('full'),
}

export default function datetimeFormat(dateTime, style_) {
  const style = style_ || 'short';

  if (!dateTime) {
    return dateTime;
  }

  const format = FORMATS[style];

  return format.format(dateTime.toInstant());
}
