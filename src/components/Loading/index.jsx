import React, { memo } from 'react'
import { DotLoading, Mask } from 'antd-mobile'

import './index.less'

const Loading = memo(() => {
  return (
    <Mask visible={true} opacity='thin'>
      <div className='loading-icon'>
        <DotLoading color='primary' />
      </div>
    </Mask>
  )
})

export default Loading