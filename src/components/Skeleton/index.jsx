import React from "react"
import { Skeleton } from 'antd-mobile'

import './index.less'

const SkeletonAgain = (props) => {
  return <div className="skeleton-box">
    <Skeleton.Title animated />
    <Skeleton.Paragraph animated lineCount={props.count} />
  </div>
};

SkeletonAgain.defaultProps = {
  count: 5
}
export default SkeletonAgain