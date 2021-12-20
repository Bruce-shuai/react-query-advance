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
    // 使用缓存的另一个好处是减少网络请求。这需要配置(作为开发者，我们知道某个api数据一般更新频率，所以我们可以控制发送网络请求更新数据的频率)
    staleTime: 30000,    // 设置数据有效时间为30s(30s之内，重复进入这个路由页面，不会去发送网络请求)  默认的staleTime 为0s
  });
  
  const { isLoading, isError, data, error, isFetching } = result;

  console.log({isLoading, isFetching});  // 在10s内，来回切换对应路由，isFetching 也是false
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
  