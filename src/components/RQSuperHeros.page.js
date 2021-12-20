import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

export default function RQSuperHerosPage() {
  // useQuery 至少需要两个参数：
  // param1 必须是一个独一无二的key，用于识别这个query
  // param2 接受一个函数，并且该函数返回的是一个promise

  // 返回值：是一个对象，该对象包含针对这个super-heroes查询的所有你需要的信息
  const result = useQuery('super-heroes', () => {
    return axios.get('http://localhost:3004/superheroes')
  });
  console.log('result', result);
  const { isLoading, isError, data, error } = result;

  // 可以见到，有了useQuery就不再需要使用useEffect + useState来获取api接口数据了
  if (isLoading) {
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
  