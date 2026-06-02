export default function formatSubmitterNames(submitters) {
  const names = submitters.map((submitter) => submitter.name);
  names.sort((a, b) => a.localeCompare(b));
  if (names.length > 1) {
    const head = names.slice(0, -1).join(', ');
    const tail = names[names.length - 1];
    return [head, ' en ', tail].join('');
  } else {
    return names[0];
  }
}
