import React, {useState} from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';

// 注意：json-server 也是支持 分页操作的： ...?_limit=xx&_page=xx
// 分页有一个问题： 就是无论你进入上一页还是下一页都会进行网络请求的发送。然后你就会在请求这个阶段进入loading状态
const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:3004/colors?_page=${pageNumber}&_limit=2`)
}

export default function PaginatedQueriesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data } = useQuery(['colors', pageNumber], () => fetchColors(pageNumber), {
    keepPreviousData: true,  // 这个属性能够提高用户体验：当你翻下一页的时候，网络请求，但不会进入loading状态，而是在当前页面状态保持不懂，当请求数据返回时，页面无缝转到下一页
  });

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }
  return (
    <>
      <div>
      {
        data?.data.map(color => {
          return <div key={color.id}>
            <h2>{color.id}-{color.label}</h2>
          </div>
        })
      }
      </div>
      <div>
        {/* 这个disabled 用得是真的好 */}
        <button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} disabled={pageNumber === 1}>prev</button>
        <button onClick={() => setPageNumber(prev => Math.min(prev + 1, 4))} disabled={pageNumber === 4}>next</button>
      </div>
    </>
  )
}
