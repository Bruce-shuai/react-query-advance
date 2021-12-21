// 自定义这个hooks，(相当于封装了一个特定的useQuery)可以在各个组件中使用，非常方便全局控制

import { useQuery, useMutation } from 'react-query';
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
  // useMutation 不像 useQuery 需要一个key值
  // param1 一个回调函数
  return useMutation((hero) => {
    return axios.post('http://localhost:3004/superheroes', hero)
  })
}