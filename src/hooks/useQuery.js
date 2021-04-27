import { useHistory } from 'react-router-dom'

// NOTE: This prevents URLSearchParams from encoding special characters
class ReadableURLSearchParams extends URLSearchParams {
  toString() {
    return [ ...this.entries() ].reduce((acc, [ key, value ]) => `${acc}${acc ? '&' : ''}${key}=${value}`, '')
  }
}

function createQueryParamsObject(location) {
  const queryObject = new ReadableURLSearchParams(location.search)

  // Convert into a regular object
  return [ ...queryObject?.entries() ].reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), {})
}

export default function useQuery() {
  const history = useHistory()

  return {
    queryParams: createQueryParamsObject(history.location)
  }
}
