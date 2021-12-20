// 自定义这个hooks，(相当于封装了一个特定的useQuery)可以在各个组件中使用，非常方便全局控制

import { useQuery } from 'react-query';
import axios from 'axios';

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', () => {
    return axios.get('http://localhost:3004/superheroes')
  }, {
    onSuccess: onSuccess,
    onError: onError,
  });
}