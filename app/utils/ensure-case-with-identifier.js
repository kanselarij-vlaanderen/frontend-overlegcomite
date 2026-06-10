import { cacheKeyFor } from '@warp-drive/core';

export default async function ensureCaseWithIdentifier(store, oldCase, caseIdentifier) {
  if (!caseIdentifier || caseIdentifier === '') {
    return null;
  }

  // Skip a request if the case identifier hasn't changed
  if (oldCase && oldCase.identifier === caseIdentifier) {
    return oldCase;
  }

  const existingCase = await store.queryOne('case', {
    'filter[:exact:identifier]': caseIdentifier
  });

  if (existingCase) {
    return existingCase;
  } else {
    const case_ = store.createRecord('case', {
      identifier: caseIdentifier
    });
    await case_.save();
    return case_;
  }
}
