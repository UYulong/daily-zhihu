import React, { memo, useEffect, useState } from 'react'
import HomeHead from './components/head'
import SwiperBox from './components/swiper'

import API from '@/apis'
import NewsList from './components/news'
import SkeletonAgain from '@/components/Skeleton'

const Home = memo(() => {
  const [today, setToday] = useState(),
    [bannerData, setBannerData] = useState([]),
    [newsList, setNewsList] = useState([])

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

  return (
    <div>
      {/* 头部区域 */}
      {today && <HomeHead today={today} />}

      {/* 轮播区域 */}
      {bannerData.length > 0 ? <SwiperBox list={bannerData} /> : null}

      {/* 新闻列表 */}
      {newsList.length === 0 ? <SkeletonAgain /> : <NewsList list={newsList} />}
    </div>
  )
})

export default Home