import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { NavBar, Toast } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'

import _ from '@/utils/tools'
import { clearNewsList } from '@/store/modules/collect'
import { clearInfo } from '@/store/modules/users'

import { PersonalBox } from './indexCss'

const Personal = memo(() => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  // 用户信息
  const { info } = useSelector(state => state.users)
  const dispatch = useDispatch()

  // 退出登录
  const handleLogout = () => {
    navigate(`/login`, { replace: true })

    _.storage.remove('TK')
    dispatch(clearNewsList())
    dispatch(clearInfo())
    Toast.show({
      icon: 'success',
      content: '安全退出'
    })
  }

  return (
    <PersonalBox>
      <NavBar onBack={handleBack}>个人中心</NavBar>

      <div className="baseInfo">
        <Link to='/update'>
          <img className="pic" src={info.pic} alt="avatar" />
          <p className="name">{info.name}</p>
        </Link>
      </div>

      <div>
        <Link to='/collect' className="tab">
          我的收藏
          <RightOutline />
        </Link>
        <div className="tab"
          onClick={handleLogout}>
          退出登录
          <RightOutline />
        </div>
      </div>

    </PersonalBox>
  )
})

export default Personal