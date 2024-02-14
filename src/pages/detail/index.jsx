import React, { memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge, SpinLoading } from 'antd-mobile'
import { LeftOutline, MessageOutline, LikeOutline, StarOutline, MoreOutline } from 'antd-mobile-icons'

import API from '@/apis'

import { DetailBox } from './indexCss'
import SkeletonAgain from '@/components/Skeleton'

const Detail = memo(() => {
  const navigate = useNavigate()
  const params = useParams()

  const [loading, setLoading] = useState(false),
    [info, setInfo] = useState(null),
    [story, setStory] = useState(null),
    [isCollect, setIsCollect] = useState(false)

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

  // 收藏
  const collectHandle = () => { }

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
            onClick={collectHandle}>
            {loading ? <SpinLoading /> : <StarOutline />}
          </span>
          <span><MoreOutline /></span>
        </div>
      </div>
    </DetailBox>
  )
})

export default Detail