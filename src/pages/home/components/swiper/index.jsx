import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, Image } from 'antd-mobile'

import { BannerBox } from './indexCss'

const SwiperBox = memo((props) => {
  const { list } = props

  const navigate = useNavigate()
  const handleJumpToDetail = (id) => {
    navigate(`/detail/${id}`)
  }

  return (
    <BannerBox>
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
    </BannerBox>
  )
})

export default SwiperBox