import React, { memo, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, SpinLoading, Toast } from 'antd-mobile'
import { LeftOutline, MessageOutline, LikeOutline, StarOutline, MoreOutline } from 'antd-mobile-icons'

import API from '@/apis'

import { DetailBox } from './indexCss'
import SkeletonAgain from '@/components/Skeleton'
import { fetchUserInfo } from '@/store/modules/users'
import { fetchCollectList, removeNews } from '@/store/modules/collect'

const Detail = memo(() => {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()

  const [loading, setLoading] = useState(false),
    [info, setInfo] = useState(null),
    [story, setStory] = useState(null)

  // 获取文章详情
  useEffect(() => {
    (async () => {
      try {
        const res = await API.queryNewsInfo(params.id)
        setInfo(res)
        handleLoadCssFile(res)

        handleDetailPicture(res)
      } catch (_) { }
    })()
  }, [])

  // 处理 文章图片
  const handleDetailPicture = ({ image }) => {
    const imgPlaceHolder = document.querySelector('.img-place-holder')
    if (!imgPlaceHolder) return

    const imgTemp = new Image()
    imgTemp.src = image
    imgTemp.onload = () => {
      imgPlaceHolder.appendChild(imgTemp)
    }
    imgTemp.onerror = () => {
      imgPlaceHolder.parentNode.removeChild(imgPlaceHolder)
    }
  }

  // 加载文章 CSS 文件
  let linkEle = null
  const handleLoadCssFile = ({ css }) => {
    if (!Array.isArray(css)) return
    const _fileUrl = css[0]

    if (!_fileUrl) return

    linkEle = document.createElement('link')
    linkEle.rel = 'stylesheet'
    linkEle.href = _fileUrl

    document.head.appendChild(linkEle)
  }

  useEffect(() => {
    return () => {
      if (linkEle) {
        document.head.removeChild(linkEle)
      }
    }
  }, [])

  // 获取点赞/评论信息
  useEffect(() => {
    (async () => {
      try {
        const res = await API.queryNewsStory(params.id)
        setStory(res)
      } catch (_) { }
    })()
  }, [])

  /* 收藏逻辑 */
  const { info: userinfo } = useSelector(state => state.users)
  const { list } = useSelector(state => state.collect)
  const dispatch = useDispatch()

  // 是否获取过用户信息
  const isGetUserInfo = Reflect.ownKeys(userinfo).length === 0
  useEffect(() => {
    if (isGetUserInfo) {
      dispatch(fetchUserInfo())
    }

    if (!isGetUserInfo && list.length === 0) {
      // 获取 收藏列表
      dispatch(fetchCollectList())
    }
  }, [])

  // 当前文章是否已经收藏
  const isCollect = useMemo(() => {
    return list.some(item => +item.news.id === +params.id)
  }, [list, params])

  const handleCollect = async () => {
    // 先判断是否登录
    if (isGetUserInfo) {
      navigate(`/login?to=${location.pathname}`)
      return
    }

    // 判断是否收藏
    if (isCollect) {
      // 取消收藏
      try {
        setLoading(true)
        const _item = list.find(item => +item.news.id === +params.id)

        if (!_item) {
          Toast.show({
            icon: 'fail',
            content: '取消失败'
          })
          return
        }

        const { code } = await API.removeStore(_item.id)
        if (+code === 0) {
          Toast.show({
            icon: 'success',
            content: '取消成功',
          })

          dispatch(removeNews(_item.id))
        } else {
          Toast.show({
            icon: 'fail',
            content: '取消失败',
          })
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    } else {
      // 收藏
      try {
        setLoading(true)
        const { code } = await API.addStore(params.id)
        if (+code === 0) {
          Toast.show({
            icon: 'success',
            content: '收藏成功',
          })

          dispatch(fetchCollectList())
        } else {
          Toast.show({
            icon: 'fail',
            content: '收藏失败',
          })
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <DetailBox>
      {!info ? <SkeletonAgain /> :
        <div className="content" dangerouslySetInnerHTML={{
          __html: info.body
        }} />
      }
      <div className="tab-bar">
        <div className="back"
          onClick={() => {
            navigate(-1)
          }}>
          <LeftOutline />
        </div>
        <div className="icons">
          <Badge content={story?.comments || 0}><MessageOutline /></Badge>
          <Badge content={story && story.popularity || 0}><LikeOutline /></Badge>
          <span className={isCollect ? 'stored' : ''}
            onClick={handleCollect}>
            {loading ? <SpinLoading /> : <StarOutline />}
          </span>
          <span><MoreOutline /></span>
        </div>
      </div>
    </DetailBox>
  )
})

export default Detail