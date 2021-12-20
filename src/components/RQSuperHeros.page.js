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
    refetchInterval: 200,   // 默认值是false，这里设置2000 表示每2s就会发送一次网络请求（更新一次数据）
    refetchIntervalInBackground: false,  // 默认是false，结合上面的refetchInterval一起使用，表示当你离开这个窗口页面，比如浏览其他网页的时候，你设置false，则该页面的网络请求会暂停发送
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
  