import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function SuperHerosPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get('http://localhost:3004/superheroes')
          .then(res => {
            setData(res.data);
            setIsLoading(false);
          })
          .catch(error => {
            setError(error.message);
            setIsLoading(false);
          })
    }, 2000)

    return () => clearTimeout(timer);
  }, [])

  if (isLoading) {
    // 提前返回，这样后面的正文内容就不会再返回了
    return <h2>Lodaing...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }
  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map(hero => {
        return <div key={hero.id}>{hero.name}</div>
      })}
    </>
  )
}


