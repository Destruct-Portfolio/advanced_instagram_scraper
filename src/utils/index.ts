function getRandomDelay(): number {
  return Math.random() * (500 - 100) + 100
}
interface QueryObject {
  [key: string]: string
}

function queryStringToJSON<T = {[key:string]:string}> (queryString: string) : T {
  // handle empty query string
  if (queryString === '') {
    return {} as T
  }
  // Split the query string into individual key-value pairs
  const pairs = queryString.split('&')

  // Reduce the pairs into a JSON object
  const result = pairs.reduce((acc: QueryObject, pair: string) => {
    const [key, value = ''] = pair.split('=') // Default value to empty string
    // Decode URI components and add them to the result object
    acc[decodeURIComponent(key)] = decodeURIComponent(value)
    return acc
  }, {})

  return result as T
}
export { queryStringToJSON, getRandomDelay }
