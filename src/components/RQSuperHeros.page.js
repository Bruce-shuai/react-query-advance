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
    cacheTime: 5000,    // 设置缓存时间为5s, 当你转到其他路由页面5s后，缓存失效(useQuery 默认cacheTime:5 mins)
  });
  const { isLoading, isError, data, error, isFetching } = result;

  // 即使对应接口的后台数据更新，isLoading也是false，在更新的数据返回之时，会无形之间把ui的数据显示发生改变。而不会有loading这种界面出现
  console.log({isLoading, isFetching});
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
  