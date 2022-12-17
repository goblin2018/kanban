import { Button } from 'antd'
import { useState } from 'react'

import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Button>
        <Link to={'/project'}>项目</Link>
      </Button>
    </div>
  )
}

export default Home
