import { useQuery } from 'react-query';
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

export const useSuperHeroData = (heroId) => {
  return useQuery(['super-hero', heroId], fetchSuperHero);
}