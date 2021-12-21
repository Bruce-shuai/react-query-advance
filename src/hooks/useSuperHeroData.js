import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';


// 方式一
// export const useSuperHeroData = (heroId) => {
//   return useQuery(['super-hero', heroId], () => {
//     return axios.get(`http://localhost:3004/superheroes/${heroId}`)
//   });
// }


// 方式二

const fetchSuperHero = ({queryKey}) => {
  return axios.get(`http://localhost:3004/superheroes/${queryKey[1]}`)
}

// 提供 initial query data
export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  // 如果在请求这个数据之前就已经获得了一系列hero的数据即heroes的数据。那我可以直接用heroes的数据而不是又去网络请求
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find(hero => hero.id === parseInt(heroId))

        if (hero) {
          return {
            data: hero
          }} else {
            return undefined
          }      
    }
  });
}