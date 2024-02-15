import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchUserInfo } from '@/store/modules/users'
import defaultAvatar from '@/assets/images/timg.jpg'

import { HomeHeadbox } from './indexCss'


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


  const info = useSelector(state => state.users.info)
  const dispatch = useDispatch()

  useEffect(() => {
    if (Reflect.ownKeys(info).length === 0) {
      dispatch(fetchUserInfo())
    }
  }, [])

  const navigate = useNavigate()
  const handleClickAvatar = () => {
    navigate('/personal')
  }

  return (
    <HomeHeadbox>
      <div className="text">
        <div className="time">
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <div className="title">知乎日报</div>
      </div>

      <div className="avatar" onClick={handleClickAvatar}>
        <img alt='avatar' src={info?.pic ? info?.pic : defaultAvatar} />
      </div>
    </HomeHeadbox>
  )
})

export default HomeHead