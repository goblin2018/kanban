import { Button } from 'antd'
import { useState } from 'react'

import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="p-12">
      <Link to={'/project/list'} className="mr-8">
        <Button>项目</Button>
      </Link>
      <Link to={'/kanban'}>
        <Button>测试甘特图</Button>
      </Link>
    </div>
  )
}

export default Home
