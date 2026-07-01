import { camelize } from '@warp-drive/utilities/string';
import ArrayProxy from '@ember/array/proxy';

export default async function muSearch(
  requestManager,
  { index, page, size, sort, filter, dataMapping, highlightConfig },
) {
  const params = new URLSearchParams(
    Object.entries({
      'page[size]': size,
      'page[number]': page,
    }),
  );

  for (const field in filter) {
    params.append(`filter[${field}]`, filter[field]);
  }

  if (sort) {
    params.append(`sort[${camelize(stripSort(sort))}]`, sortOrder(sort));
  }

  if (highlightConfig) {
    if (highlightConfig.fields) {
      params.append(`highlight[:fields:]`, highlightConfig.fields.join(','));
    }

    if (highlightConfig.tag) {
      params.append('highlight[:tag:]', highlightConfig.tag);
    }
  }

  const request = { url: `/${index}/search?${params}` };
  const response = await requestManager.request(request);
  const {
    content: { count, data },
  } = response;

  const entries = await Promise.all(data.map(dataMapping));
  const pagination = getPaginationMetadata(page, size, count);

  return ArrayProxy.create({
    content: entries.slice(),
    highlight: data.map((entry) => entry.highlight),
    meta: {
      count,
      pagination,
    },
  });
}

function sortOrder(sort) {
  if (sort.startsWith('-')) {
    return 'desc';
  }
  if (sort.length > 0) {
    return 'asc';
  }
  return null;
}

function stripSort(sort) {
  return sort.replace(/(^\+)|(^-)/g, '');
}

function getPaginationMetadata(pageNumber, size, total) {
  const pagination = {};

  pagination.first = {
    number: 0,
    size,
  };

  const lastPageNumber =
    total % size === 0
      ? Math.floor(total / size) - 1
      : Math.floor(total / size);
  const lastPageSize = total % size === 0 ? size : total % size;
  pagination.last = {
    number: lastPageNumber,
    size: lastPageSize,
  };

  pagination.self = {
    number: pageNumber,
    size,
  };

  if (pageNumber > 0) {
    pagination.prev = {
      number: pageNumber - 1,
      size,
    };
  }

  if (pageNumber < lastPageNumber) {
    const nextPageSize =
      pageNumber + 1 === lastPageNumber ? lastPageSize : size;
    pagination.next = {
      number: pageNumber + 1,
      size: nextPageSize,
    };
  }

  return pagination;
}
