export default function groupBySubmitter(agendaItems) {
  const map = {};

  for (const item of agendaItems) {
    for (const submitter of item.submitters) {
      if (Object.hasOwn(map, submitter.name)) {
        map[submitter.name].push(item);
      } else {
        map[submitter.name] = [item];
      }
    }
  }

  return map;
}
