export default function requestToQuery(req: any): string {
  const requestBody = Object.entries(req).reduce((acc: any, [key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        acc[key] = value.join(",");
      } else {
        acc[key] = value;
      }
    }
    return acc;
  }, {});
  const query = new URLSearchParams(requestBody);
  return query.toString();
}
