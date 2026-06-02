function makeFormat(style) {
  return Intl.DateTimeFormat('nl-BE', { dateStyle: style, timeStyle: style})
}

const FORMATS = {
  short: Intl.DateTimeFormat('nl-BE', {
    day: 'numeric', month: 'short', year: '2-digit',
    hour: '2-digit', minute: '2-digit'
  }),
  medium: makeFormat('medium'),
  long: makeFormat('long'),
  full: makeFormat('full'),
  'oc-short': Intl.DateTimeFormat('nl-BE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }),
  'oc-long': Intl.DateTimeFormat('nl-BE', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }),
}

export default function formatDatetime(dateTime, style_) {
  const style = style_ || 'oc-short';

  if (!dateTime) {
    return dateTime;
  }

  const format = FORMATS[style];

  return format.format(dateTime.toInstant()).replaceAll('/', '-');
}
