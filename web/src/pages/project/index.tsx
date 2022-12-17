import { Button } from 'antd'
import { useAppDispatch } from 'app/hooks'
import AddModal from './addModal'
import { openAddModal } from './slice'

const ProjectPage = () => {
  const dispatch = useAppDispatch()
  return (
    <>
      <Button
        onClick={() => {
          dispatch(openAddModal())
        }}
      >
        创建项目
      </Button>
      <AddModal />
    </>
  )
}

export default ProjectPage
