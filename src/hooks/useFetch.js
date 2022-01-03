import {useState, useEffect} from 'react'

export const useFetch = (url, options) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  // useRef to wrap an object/array argument
  // which is a useEffect dependancy
  const options = useRef(_options).current

  useEffect(() => {
    console.log(options)
    const controller = new AbortController()
    const fetchData = async () => {
      setIsPending(true)

      try {

      const res = await fetch(url, {signal: controller.signal})
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const json = await res.json()

      setIsPending(false)

      setData(json)
      setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log('the fetch was aborted')
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
        
    }
  }
  fetchData()

  return () => {
    controller.abort()
  }
  }, [url, options])

  return {data, isPending, error}
}