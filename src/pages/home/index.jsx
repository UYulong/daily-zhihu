import React, { memo } from 'react'
import HomeHead from './components/head'

const Home = memo(() => {
  return (
    <div>
      <HomeHead today={'20240212'} />
    </div>
  )
})

export default Home