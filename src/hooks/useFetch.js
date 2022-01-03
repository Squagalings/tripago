import {useState, useEffect} from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true)

      try {

      const res = await fetch(url)
      console.log(res)
      const json = await res.json()

      setIsPending(true)

      setData(json)
      setError(null)
      } catch (err) {
      setError('Could not fetch the data')
      console.log(err.message)
    }
  }
  }, [url])

  return {data, isPending}
}