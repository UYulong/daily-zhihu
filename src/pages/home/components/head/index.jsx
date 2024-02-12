import React, { memo, useMemo } from 'react'

import defaultAvatar from '@/assets/images/timg.jpg'
import './index.less'

const HomeHead = memo((props) => {
  const { today } = props

  const time = useMemo(() => {
    let [, month, day] = today.match(/^(?:\d{4})(\d{2})(\d{2})$/),
      area = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']

    return {
      day,
      month: area[+month]
    }
  }, [today])

  return (
    <div className='home-head_box'>
      <div className="text">
        <div className="time">
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <div className="title">知乎日报</div>
      </div>

      <div className="avatar">
        <img alt='avatar' src={defaultAvatar} />
      </div>

    </div>
  )
})

export default HomeHead