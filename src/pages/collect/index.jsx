import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NavBar, SwipeAction } from 'antd-mobile'

import NewsItem from '@/components/NewsItem'
import SkeletonAgain from '@/components/Skeleton'
import { fetchCollectList } from '@/store/modules/collect'

import { CollectBox } from './indexCss'

const Collect = memo(() => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  const { list } = useSelector(state => state.collect)
  const dispatch = useDispatch()

  useEffect(() => {
    if (list && list.length === 0) {
      dispatch(fetchCollectList())
    }
  }, [])

  return (
    <CollectBox>
      <NavBar onBack={handleBack}>我的收藏</NavBar>

      {!list ? <SkeletonAgain /> : <div className="box">
        {list.map(item => {
          let { id, news } = item
          return <SwipeAction key={id}
            rightActions={[{
              key: 'delete',
              text: '删除',
              color: 'danger',
              // onClick: removeStore.bind(null, id)
            }]}>
            <NewsItem info={news} />
          </SwipeAction>
        })}
      </div>
      }
    </CollectBox>
  )
})

export default Collect