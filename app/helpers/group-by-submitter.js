export default function groupBySubmitter(agendaitems) {
  const map = {};

  for (const item of agendaitems) {
    const submitters = (item.submitters.length !== 0) ? item.submitters : [{name: ''}]
    for (const submitter of submitters) {
      if (Object.hasOwn(map, submitter.name)) {
        map[submitter.name].push(item);
      } else {
        map[submitter.name] = [item];
      }
    }
  }

  return map;
}
