import React, { memo } from 'react'
import { Divider } from 'antd-mobile'
import NewsItem from '@/components/NewsItem';


import dayjs from 'dayjs';

import './index.less'

const NewsList = memo((props) => {
  const { list } = props

  if (list.length === 0) return null
  // console.log(list);

  return (
    <div className='news-box'>
      {
        list.map((item, index) => {
          const { date, stories } = item
          return <React.Fragment key={date}>
            {
              index !== 0 ? <Divider contentPosition="left">
                {dayjs(date).format('MM月DD日')}
              </Divider> : null
            }

            {
              stories.map(news => {
                return <NewsItem key={news.id} info={news} />
              })
            }
          </React.Fragment>
        })
      }
    </div>
  )
})

export default NewsList