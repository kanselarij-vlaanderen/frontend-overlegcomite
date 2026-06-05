export default function formatDocumentName({
  date,
  priority,
  subPriority,
  notification = false
}) {
  const dateString = `${f(date.year, 4)} ${f(date.month, 2)}${f(date.day, 2)}`;
  const priorityString = f(priority, 2);
  const subPriorityString = subPriority ? subPriority.toUpperCase() : '';
  const not = notification ? 'NOT ' : ''

  return `OC ${dateString} ${not}PUNT ${priorityString}${subPriorityString}`
}

function f(num, width) {
  return num.toString().padStart(width, '0');
}
