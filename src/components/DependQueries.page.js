import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query';


const fetchUserByEmail = (email) => {
  // 这种接口id查询操作在json-server 是支持的
  return axios.get(`http://localhost:3004/users/${email}`)
}
const fetchHobbiesByUsername = (username) => {
  return axios.get(`http://localhost:3004/usernames/${username}`)
}

export default function DependQueriesPage({email}) {
  // 链式请求
  const { data:user } = useQuery(['user', email], () => fetchUserByEmail(email))
  const username = user?.data.username;
  console.log('user', username);
  const { data:hobbies } = useQuery(['hobbies', username], () => fetchHobbiesByUsername(username), {
    enabled: !!username  // 只有当username数据成功获取到后，才会进行这个数据的查询
  })
  console.log('hobbies', hobbies?.data);
  return (
    <div>
        123
    </div>
  )
}
