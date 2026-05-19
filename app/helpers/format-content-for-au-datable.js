/** Takes a warpDrive query result, and formats the data in a way that AuDatatable expects it.
  *
  * TODO: Change AuDatatable itself to work with the new query result format instead.
  */
export default function formatContentForAuDatable(
  queryResult
) {
  // We need to attach properties to the data array proxy. We create a new
  // object to avoid interacting with the proxy directly.
  const content = Object.create(queryResult.data);
  const pagination = mapObjectValues(queryResult.links, urlWithNumber)

  // We need to attach a 'meta' attribute to the record array. We can't do this
  // using normal assignment, as the array proxy won't let us. Using
  // defineProperty lets us skip the setters on the array proxy.
  Object.defineProperty(content, "meta", {
    value: {
      count: queryResult.meta.count,
      pagination
    }
  });

  return content;
}

/** Attaches a `number` attribute to the url, containing the page number.
  */
function urlWithNumber(urlLike) {
  const url = new URL(urlLike, document.location);
  const searchParams = url.searchParams;

  const number = searchParams.get("page[number]");
  url.number = number ? Number.parseInt(number) : undefined;
  return url;
}

function mapObjectValues(o, callback) {
  return Object.fromEntries(
    Object.entries(o)
      .map(([k, v]) => [k, callback(v)]))
}
