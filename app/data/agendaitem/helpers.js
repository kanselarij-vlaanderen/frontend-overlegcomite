import { cacheKeyFor } from "@warp-drive/core";
import { query } from "@warp-drive/utilities/json-api";
import { createCase } from "../case/builders";

export async function updateAgendaitemCase(store, agendaitem, setRequest) {
  const case_ = agendaitem.case.content;
  const identifier = case_?.identifier || "";
  const caseCacheKey = case_ && cacheKeyFor(case_)

  if (identifier === "") {
      agendaitem.case = null;
  } else {
    const { content } = await setRequest(store.request(query('case', {
      'filter[:exact:identifier]': identifier,
      'page[size]': 1,
    })))

    let existingCase = content.data[0];

    if (existingCase) {
      agendaitem.case = existingCase;
      case_ && store.cache.rollbackAttrs(caseCacheKey);

    } else if (store.cache.isNew(caseCacheKey)) {
      await setRequest(store.request(createCase(case_)));

    } else {
      const { content } = await setRequest(store.request(
        createCase(store.createRecord('case', { identifier }))
      ))
      const newCase = content.data;
      agendaitem.case = newCase;
      store.cache.rollbackAttrs(caseCacheKey);
    }
  }
}
