import { Button, Input } from 'antd'
import {
  listAllComments,
  Comment,
  addComment,
  deleteComment,
  updateComment,
} from 'api/comment'
import { Task } from 'api/task'
import { dateSuffix, toDateString } from 'api/utils'
import { useAppSelector } from 'app/hooks'
import UserAvatar from 'components/userAvatar'
import React, { useEffect, useState } from 'react'

interface Props {
  task: Task
}

const Comments: React.FC<Props> = ({ task }) => {
  const user = useAppSelector((s) => s.user.my)
  const drawerOpen = useAppSelector((s) => s.task.taskDrawerOpen)
  const [comments, setComments] = useState<Comment[]>([])
  const [shouldUpdate, setShouldUpdate] = useState(false)

  useEffect(() => {
    if (drawerOpen) {
      setShouldUpdate(true)
    } else {
      setComments([])
    }
  }, [drawerOpen])

  const [hoverIdx, setHoverIdx] = useState(-1)
  const [editIdx, setEditIdx] = useState(-1)
  const [editInfo, setEditInfo] = useState('')
  const [info, setInfo] = useState('')

  const submitAdd = () => {
    if (info.trim() != '') {
      addComment({ taskId: task.id, info: info })
        .then((res) => {
          let nc = res.data as Comment
          setComments([
            ...comments,
            { ...nc, taskId: task.id, user: user, info: info },
          ])
        })
        .finally(() => {
          setInfo('')
        })
    }
  }

  const submitEdit = () => {
    let ni = editInfo.trim()
    if (ni == '' || ni == comments[editIdx].info) {
      setEditIdx(-1)
      return
    }

    updateComment({ id: comments[editIdx].id, info: ni }).then((res) => {
      console.log('updateComment ', res)
      let nc = res.data as Comment
      let ncs = [...comments]
      ncs[editIdx] = { ...ncs[editIdx], info: ni, updatedAt: nc.updatedAt }
      setComments(ncs)
    })

    setEditIdx(-1)
  }

  useEffect(() => {
    if (shouldUpdate) {
      listAllComments({ taskId: task.id }).then((res) => {
        console.log(res)
        let items = res.data.items
        setComments(items || [])
      })
      setShouldUpdate(false)
    }
  }, [shouldUpdate])
  return (
    <div className="h-full">
      <div className="mb-4">评论</div>
      <div className="h-[calc(100%-140px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {comments.map((c, idx) => (
          <div
            key={`comment-${c.id}`}
            className="mb-4"
            onMouseEnter={() => {
              setHoverIdx(idx)
            }}
            onMouseLeave={() => {
              setHoverIdx(-1)
            }}
          >
            <div className="flex mb-2">
              <div className="flex items-center">
                <UserAvatar user={c.user!} />
                <div>{c.user?.name}</div>
                <div>{toDateString(c.updatedAt!)}</div>
                <div>{dateSuffix(c.updatedAt!)}</div>
              </div>

              <div
                className="flex"
                style={{
                  display:
                    idx == hoverIdx && idx != editIdx && c.user!.id == user?.id
                      ? ''
                      : 'none',
                }}
              >
                <Button
                  onClick={() => {
                    setEditIdx(idx)
                    setEditInfo(c.info!)
                  }}
                >
                  编辑
                </Button>
                <Button
                  onClick={() => {
                    deleteComment({ id: c.id })
                    let ncs = [...comments]
                    ncs.splice(idx, 1)
                    setComments(ncs)
                  }}
                >
                  删除
                </Button>
              </div>
            </div>

            {editIdx == idx ? (
              <div>
                <Input.TextArea
                  value={editInfo}
                  onChange={(e) => {
                    setEditInfo(e.target.value)
                  }}
                />
                <div className="flex items-center justify-end">
                  <Button
                    size="small"
                    onClick={() => {
                      setEditIdx(-1)
                    }}
                  >
                    取消
                  </Button>
                  <Button size="small" onClick={submitEdit}>
                    确认
                  </Button>
                </div>
              </div>
            ) : (
              <div>{c.info}</div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute w-full bottom-0 h-[100px]s">
        <div>
          <Input.TextArea
            className="w-full"
            value={info}
            placeholder="请输入评论..."
            onChange={(e) => {
              setInfo(e.target.value)
            }}
          />
        </div>
        <div className="flex justify-end mt-2">
          <Button
            className="mr-2"
            onClick={() => {
              setInfo('')
            }}
          >
            取消
          </Button>
          <Button type="primary" onClick={submitAdd}>
            确认
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Comments
