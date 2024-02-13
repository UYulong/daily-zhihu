import React, { memo, useEffect, useState } from 'react'
import HomeHead from './components/head'
import SwiperBox from './components/swiper'

import API from '@/apis'

const Home = memo(() => {
  const [today, setToday] = useState(),
    [bannerData, setBannerData] = useState([]),
    [newsList, setNewsList] = useState([])

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const { date, stories, top_stories } = await API.queryNewsLatest()

        setToday(date)
        setNewsList(stories)
        setBannerData(top_stories)
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
    </div>
  )
})

export default Home