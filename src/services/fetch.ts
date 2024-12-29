export const fetchData = async <T>(
  url: string = '/api',
  options: RequestInit = {},
): Promise<[T[] | null, string | null]> => {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      const error = `An error ocurred fetching data! Status: ${response.status}`

      return [null, error]
    }

    const result: T[] = await response.json()
    return [result, null]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return [null, `An error ocurred fetching data! ${err.message}`]
  }
}
