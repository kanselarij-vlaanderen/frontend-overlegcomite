import { cacheKeyFor } from '@warp-drive/core';

export default async function saveCaseIdentifier(store, agendaitem, caseIdentifier) {
  if (agendaitem.case.content)
    store.cache.rollbackAttrs(cacheKeyFor(agendaitem.case.content))

  if (caseIdentifier && caseIdentifier !== '') {

    // Avoid a request if the case hasn't changed
    if (agendaitem.case.content &&
      agendaitem.case.content.identifier === caseIdentifier) {
      return;
    }

    const existingCase = (await store.query('case', {
      'filter[:exact:identifier]': caseIdentifier
    }))[0];
    if (existingCase) {
      agendaitem.case = existingCase;
    } else {
      const case_ = store.createRecord('case', {
        identifier: caseIdentifier
      });
      agendaitem.case = case_;
      await case_.save();
    }
  } else {
    agendaitem.case = null;
  }
}
