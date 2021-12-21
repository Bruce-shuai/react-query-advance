import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSuperHeroesData, useAddSuperHeroData } from '../hooks/useSuperHeroesData';
export default function RQSuperHerosPage() {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data) => {
    // 这里的数据，获取的是 接口请求返回的数据
    console.log('Perform side effect after data fetching', data);
  }
  const onError = (error) => {
    console.log('Perform side effect after encountering error', error);
  }

  const result = useSuperHeroesData(onSuccess, onError);
  // mutate 是一个函数，我们可以调用这个函数进行post请求
  const { mutate:addHero } = useAddSuperHeroData();  // 不传任何参数

  const { isLoading, isError, data, error, isFetching, refetch } = result;
  console.log({isLoading, isFetching});

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  } 

  const handleAddHeroClick = () => {
    console.log({name, alterEgo});
    const hero = { name, alterEgo }
    addHero(hero);
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {/* 这里没有用form表格，而是用的普通div标签 */}
      <div>   
        <input 
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      {/* 这个refetch 是一个什么操作？直接发送新请求 然后刷新页面 */}
      <button onClick={refetch}>Fetch heroes</button>
      {
        data?.data.map(hero => {
          return <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        })
      }
    </>
  )
}
  