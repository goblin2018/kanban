import { Button } from 'antd'
import { useState } from 'react'

import { Link } from 'react-router-dom'
import { CirclePicker, Color } from 'react-color'

function Home() {
  const [color, setColor] = useState<Color>('#f44336')

  return (
    <div className="p-12">
      <Link to={'/project/list'} className="mr-8">
        <Button>项目</Button>
      </Link>
      <Link to={'/gantt'}>
        <Button>测试甘特图</Button>
      </Link>
      <div>
        <CirclePicker
        
          color={color}
          onChange={(c, e) => {
            console.log(c, e)
            setColor(c.hex)
          }}
        />
      </div>
    </div>
  )
}

export default Home
