import React, { memo, useEffect, useState, useRef } from 'react'
import { DotLoading } from 'antd-mobile'

import HomeHead from './components/head'
import SwiperBox from './components/swiper'

import API from '@/apis'
import NewsList from './components/news'
import SkeletonAgain from '@/components/Skeleton'

import { Homebox } from './indexCss'

const Home = memo(() => {
  const [today, setToday] = useState(),
    [bannerData, setBannerData] = useState([]),
    [newsList, setNewsList] = useState([])

  // 获取数据
  useEffect(() => {
    const handleGetData = async () => {
      try {
        const { date, stories, top_stories } = await API.queryNewsLatest()

        setToday(date)
        setBannerData(top_stories)

        setNewsList([{
          date,
          stories
        }])
      } catch (_) { }
    }

    handleGetData()
  }, [])

  // 获取Dom元素
  const loadBox = useRef()
  useEffect(() => {
    const _loadMoreDom = loadBox.current
    let obIns = new IntersectionObserver(async changes => {
      const item = changes[0]

      if (item.isIntersecting) {
        const time = newsList[newsList.length - 1].date

        const res = await API.queryNewsBefore(time)
        setNewsList([...newsList, res])
      }
    })

    obIns.observe(_loadMoreDom)

    return () => {
      obIns.unobserve(_loadMoreDom)
      obIns = null
    }
  }, [newsList])

  return (
    <Homebox>
      {/* 头部区域 */}
      {today && <HomeHead today={today} />}

      {/* 轮播区域 */}
      {bannerData.length > 0 ? <SwiperBox list={bannerData} /> : null}

      {/* 新闻列表 */}
      {newsList.length === 0 ? <SkeletonAgain /> : <NewsList list={newsList} />}

      {/* 加载更多 */}
      <div className="load-more" ref={loadBox}
        style={{
          display: newsList.length > 0 ? 'block' : 'none'
        }}>
        数据加载中
        <DotLoading />
      </div>
    </Homebox>
  )
})

export default Home