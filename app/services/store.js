import { useLegacyStore } from '@warp-drive/legacy';
import { JSONAPICache } from '@warp-drive/json-api';
import ArrayProxy from '@ember/array/proxy';

const LegacyStore = useLegacyStore({
  linksMode: false,
  legacyRequests: true,
  cache: JSONAPICache,
  handlers: [],
  transformations: [],
});

export default class Store extends LegacyStore {
  async queryOne(modelName, query, options) {
    query = query || {};
    if (!(query['page[size]'] || (query.page && query.page.size))) {
      query['page[size]'] = 1;
    }
    const results = await this.query(modelName, query, options);
    if (results.length) {
      return results[0];
    }
    return null;
  }

  async queryAll(modelName, query, options) {
    query = query || {};
    const batchSize = query.page?.size || 100;

    const firstBatch = this.query(
      modelName,
      Object.assign({}, query, {
        'page[size]': batchSize,
        'page[number]': 0,
      }),
    );

    const batches = [firstBatch];
    const result = await firstBatch;
    const count = result.meta.count;

    const nbOfBatches = Math.ceil(count / batchSize);
    for (let i = 1; i < nbOfBatches; i++) {
      const queryForBatch = Object.assign({}, query, {
        'page[size]': batchSize,
        'page[number]': i,
      });
      const batch = this.query(modelName, queryForBatch, options);
      batches.push(batch);
    }

    const results = await Promise.all(batches);
    //* note: always use .slice() on this ArrayProxy if you plan on iterating the result.
    return ArrayProxy.create({
      content: results.map((result) => result.slice()).flat(),
      meta: {
        count,
      },
    });
  }

  findRecordByUri(modelName, uri, options) {
    const cachedRecord = this.peekAll(modelName).find(
      (model) => model.uri === uri,
    );
    if (cachedRecord) {
      return cachedRecord;
    }
    return this.queryOne(modelName, {
      ...options,
      'filter[:uri:]': uri,
    });
  }

  async count(modelName, query, options) {
    query = query || {};
    if (!(query['page[size]'] || (query.page && query.page.size))) {
      query['page[size]'] = 1;
    }
    const results = await this.query(modelName, query, options);
    const count = results.meta.count;
    return count;
  }
}
