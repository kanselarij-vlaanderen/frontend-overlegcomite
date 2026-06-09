import { query } from '@warp-drive/utilities/json-api';

export default function muSearchRequest(type, index, params) {
  const options = query(type, params, {
      resourcePath: `${index}/search`
    })

  return new Request(options.url, options);
}
