import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'antd-mobile'

import './index.less'

const NewsItem = memo(({ info }) => {

  if (!info) return null

  const { id, title, hint, images = [''], image } = info

  const imgSrc = Array.isArray(images) && images[0] ? Array.isArray(images) && images[0] : image ? image : ''

  return (
    <div className='news-item'>
      <Link to={`/detail/${id}`}>
        <div className="info">
          <h4 className="title">{title}</h4>
          <p className="author">{hint}</p>
        </div>
        <Image lazy src={imgSrc} />
      </Link>
    </div>
  )
})

export default NewsItem