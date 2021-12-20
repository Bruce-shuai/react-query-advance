import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

export default function RQSuperHerosPage() {

  const onSuccess = (data) => {
    // 这里的数据，获取的是 接口请求返回的数据
    console.log('Perform side effect after data fetching', data);
  }
  const onError = (error) => {
    console.log('Perform side effect after encountering error', error);
  }

  const result = useQuery('super-heroes', () => {
    return axios.get('http://localhost:3004/superheroes')
  }, {
    onSuccess: onSuccess,
    onError: onError
  });
  
  const { isLoading, isError, data, error, isFetching } = result;
  console.log({isLoading, isFetching});
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {
        data?.data.map(hero => {
          return <div key={hero.id}>{hero.name}</div>
        })
      }
    </>
  )
}
  