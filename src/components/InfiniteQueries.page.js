import React, { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:3004/colors?_limit=2&_page=${pageParam}`);
}

export default function InfiniteQueriesPage() {
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    }
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
        data?.pages.map((group, i) => {
          // Fragment 标签是一个什么东西？是一个分组效果，和<></>一样，不过比<></>多一个key属性
          return <Fragment key={i}>
            {
              group.data.map(color => {
                return <h2 key={color.id}>{color.id} {color.label}</h2>
              })
            }
          </Fragment>
        })
      }
    </div>
    <div>
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load more
      </button>
    </div>
    <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}
