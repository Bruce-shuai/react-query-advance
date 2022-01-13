import axios from 'axios';

// 可以自定义配置新建一个 axios 实例
const client = axios.create({ baseURL: 'http://localhost: 4000'})

export const request = ({...options}) => {
  client.default.headers.common.Authorization = `Bearer token`
  const onSuccess = response => response
  const onError = err => {
    return error;
  }

  return client(options).then(onSuccess).catch(onError)
}