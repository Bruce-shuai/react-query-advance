import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

export default function RQSuperHerosPage() {
  // useQuery 至少需要两个参数：
  // param1 必须是一个独一无二的key，用于识别这个query
  // param2 接受一个函数，并且该函数返回的是一个promise
  // param3 是用户自定义配置 query
  // 返回值：是一个对象，该对象包含针对这个super-heroes查询的所有你需要的信息
  const result = useQuery('super-heroes', () => {
    return axios.get('http://localhost:3004/superheroes')
  }, {
    // 当点击按钮时，发送请求
    enabled: false,  // 第一步：禁止请求的发送
  });
  
  // 第二步：获取 refetch  方法
  const { isLoading, isError, data, error, isFetching, refetch } = result;
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
      <button onClick={refetch}>获取Heros</button>
      {
        data?.data.map(hero => {
          return <div key={hero.id}>{hero.name}</div>
        })
      }
    </>
  )
}
  