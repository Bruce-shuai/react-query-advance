import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHero = () => {
  return axios.get('http://localhost:3004/superheroes')
}

const fetchFriends = () => {
  return axios.get('http://localhost:3004/friends')
}


export default function ParallelQueriesPage() {
  const { data: superheroes } = useQuery('super-heroes', fetchSuperHero);
  const { data: friends } = useQuery('friends', fetchFriends);
  return (
    <div>
      
    </div>
  )
}
