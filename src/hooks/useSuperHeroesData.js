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

// 乐观更新(optimistic Updates): 比如当点击向上或向下投票箭头时，UI会立即反映投票结果，即使服务器还没有成功处理它。如果服务器失败，投票实际上将回滚，并显示一条错误消息

// useMutaion 可以支持delete patch post put 请求
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  // useMutation 不像 useQuery 需要一个key值
  // param1 一个回调函数
  // param2 自定义配置项
  return useMutation((hero) => {
    return axios.post('http://localhost:3004/superheroes', hero)
    }, {
      // onMutate: 允许你返回一个值，该值稍后将作为最后一个参数传递给onError和onSettled处理程序
      // 回滚（Rollback）指的是程序或数据处理错误，将程序或数据恢复到上一次正确状态的行为
      onMutate: async (newHero) => {
        await queryClient.cancelQueries('super-heroes');  // 取消super-heroes
        const previousHeroData = queryClient.getQueriesData('super-heroes') // 记住之前数据，防止后面数据请求错误，无法回滚
        // 乐观更新到最新的数据
        queryClient.setQueryData('super-heroes', (oldQueryData) => {
          return {
            ...oldQueryData,
            data: [
              ...oldQueryData.data,
              { id: oldQueryData?.data?.length + 1, ...newHero}
            ]
          }
        })
        // 以context对象的方式返回之前记录的数据
        return {
          previousHeroData,
        }
      },
      // 如果 mutation 失败，使用 context 中记录的之前数据 进行回滚
      onError: (_error, _hero, context) => {
        queryClient.setQueryData('super-heroes', context.previousHeroData)
      },
      // 无论失败还是成功，最后重新更新最新的数据(refetch)
      onSettled: () => {
        queryClient.invalidateQueries('super-heroes')
      },
    }
  )
}