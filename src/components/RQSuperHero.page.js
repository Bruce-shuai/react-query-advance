import React from 'react'
// import axios from 'axios'
import { useParams } from "react-router-dom";
import { useSuperHeroData } from '../hooks/useSuperHeroData';
export default function RQSuperHeroPage() {
  let params = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(params.heroId);
  
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  const hero = data.data;
  return <h2>{hero.name} - {hero.alterEgo}</h2>;
}
