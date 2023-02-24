import { Button, Radio } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useMemo, useState } from 'react'
import ProjectModal from './projectModal'
import ProjectCard from './projectCard'
import {
  listProjects,
  setProjectModalState,
  setProjectOption,
} from 'reducers/projectSlice'
import Header from 'components/header/Header'
import { PlusOutlined } from '@ant-design/icons'

const ProjectPage = () => {
  const dispatch = useAppDispatch()
  const { totalProjects, projectOption } = useAppSelector((s) => s.project)
  const user = useAppSelector((s) => s.user.my)

  const ps = useMemo(() => {
    if (projectOption == 'my') {
      return totalProjects.filter((p) => p.ownerId == user?.id)
    }

    return totalProjects
  }, [totalProjects, projectOption, user])

  useEffect(() => {
    dispatch(listProjects())
  }, [])

  return (
    <div>
      <Header />
      <ProjectModal />

      <div className="w-[1596px] mx-auto bg-white py-8 rounded-xl mt-12 min-h-[calc(100vh-180px)]">
        <div
          className="w-full px-12 mb-5 pb-4"
          style={{ boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex w-full justify-between">
            <div className="text-xl">
              {projectOption == 'all' ? '全部项目' : '我的项目'}
            </div>

            <div className="flex">
              <Radio.Group
                className="mr-6"
                value={projectOption}
                onChange={(e) => {
                  dispatch(setProjectOption(e.target.value))
                }}
              >
                <Radio.Button value="my">我的项目</Radio.Button>
                <Radio.Button value="all">全部项目</Radio.Button>
              </Radio.Group>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  dispatch(setProjectModalState('add'))
                }}
              >
                创建项目
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mr-5 px-12">
          {ps?.map((p, idx) => (
            <ProjectCard project={p} key={`${idx}project`} />
          ))}
        </div>
      </div>

      <div className="text-center mt-10 py-2 w-full bg-white">
        深圳市森盟科技有限公司
      </div>
    </div>
  )
}

export default ProjectPage
