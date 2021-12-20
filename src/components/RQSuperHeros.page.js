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
    refetchOnMount: true,  // 默认值为true,表示只要数据过期(staleTime到了)，重新进入这个路由页面的时候就可以进行refetch(重新进行网络请求)。false，则结果相反。'always' 则表示无视staleTime,只要进入该路由页面则可以进行refetch
    refetchOnWindowFocus: true  // 默认值为true, 点击页面 更新的数据就会重新发送请求(达到自动更新数据的效果) --> 同样是3个对应值： true、false、'always'
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
  