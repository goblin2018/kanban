import { useState } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <ButtonGroup>
        <Button>
          <Link to={'/project'}>项目</Link>
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Home
