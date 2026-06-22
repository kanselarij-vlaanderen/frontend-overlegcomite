const DATE_REGEX = /^(?:(\d{1,2})-)?(?:(\d{1,2})-)?(\d{4})$/;

export default function textToDateRange(input) {
  const dateString = input?.replaceAll('/', '-');

  const match = DATE_REGEX.exec(dateString);
  if (!match) {
    return null;
  }

  const common = {
    year: parseInt(match[3]),
    month: 1,
    day: 1,
  };

  let unit = 'years';

  if (match[1] && match[2]) {
    unit = 'days';
    common.month = parseInt(match[2]);
    common.day = parseInt(match[1]);
  } else if (match[1]) {
    unit = 'months';
    common.month = parseInt(match[1]);
  }

  if (common.month === 0) {
    return null
  }

  const begin = Temporal.PlainDate.from(common);
  const end = begin.add({ [unit]: 1});

  return [begin, end];
}

