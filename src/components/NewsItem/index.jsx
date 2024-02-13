import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'antd-mobile'

import './index.less'

const NewsItem = memo(({ info }) => {

  if (!info) return null

  const { id, title, hint, images } = info
  if (!images) images = ['']

  return (
    <div className='news-item'>
      <Link to={`/detail/${id}`}>
        <div className="info">
          <h4 className="title">{title}</h4>
          <p className="author">{hint}</p>
        </div>
        <Image lazy src={Array.isArray(images) && images[0] || ""} />
      </Link>
    </div>
  )
})

export default NewsItem