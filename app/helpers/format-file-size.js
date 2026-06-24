export default function formatFileSize(bytes) {
  const step = Math.floor(Math.log10(bytes)/LOG_STEP_SIZE);
  const amount = (bytes / (STEP_SIZE ** step)).toPrecision(3);
  return `${amount} ${UNITS[step]}`;
}

const UNITS = [
  'B',
  'kB',
  'MB',
  'GB'
]

const STEP_SIZE = 1000;
const LOG_STEP_SIZE = Math.log10(STEP_SIZE);
