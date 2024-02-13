import React, { memo } from 'react'
import { Swiper, Image } from 'antd-mobile'

import './index.less'
import { useNavigate } from 'react-router-dom'

const SwiperBox = memo((props) => {
  const { list } = props

  const navigate = useNavigate()
  const handleJumpToDetail = (id) => {
    navigate(`/detail/${id}`)
  }

  return (
    <div className='banner-box'>
      <Swiper>
        {
          list.map((item) => {
            const { id, hint, image, title } = item
            return <Swiper.Item key={id} onClick={() => handleJumpToDetail(id)}>
              <Image src={image} lazy />

              <div className="content">
                <h3 className="title">{title}</h3>
                <p className="author">{hint}</p>
              </div>
            </Swiper.Item>
          })
        }
      </Swiper>
    </div>
  )
})

export default SwiperBox