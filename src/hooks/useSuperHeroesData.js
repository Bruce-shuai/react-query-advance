// 自定义这个hooks，(相当于封装了一个特定的useQuery)可以在各个组件中使用，非常方便全局控制

import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', () => {
    return axios.get('http://localhost:3004/superheroes')
  }, {
    onSuccess: onSuccess,
    onError: onError,
  });
}

// useMutaion 可以支持delete patch post put 请求
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  // useMutation 不像 useQuery 需要一个key值
  // param1 一个回调函数
  // param2 自定义配置项
  return useMutation((hero) => {
    return axios.post('http://localhost:3004/superheroes', hero)
  }, {
    onSuccess: () => {  // 当mutation 成功后的操作
      // 这里实现了，post请求发送更新了后端的数据，然后前端界面自动重新发送get请求获取变化后的数据
      queryClient.invalidateQueries('super-heroes')  // 因为这里使原来的super-heroes里的数据无效了，所以react-query会自动重新发新的super-heroes数据请求
    }
  })
}