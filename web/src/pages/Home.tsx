import { Button } from 'antd'
import { useState } from 'react'

import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to={'/project/list'}>
        <Button>项目</Button>
      </Link>
    </div>
  )
}

export default Home
