import { Button, Input } from 'antd'
import { listAllComments, Comment, addComment } from 'api/comment'
import { Task } from 'api/task'
import { useAppSelector } from 'app/hooks'
import React, { useEffect, useState } from 'react'
import CommentTag from './comment'

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
      <div className="mb-4 text-text-disabled">评论</div>
      <div
        className="h-[calc(100%-140px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-200 
         scrollbar-thumb-rounded-full
         scrollbar-track-blue-50 pr-4"
      >
        {comments.map((c, idx) => (
          <CommentTag
            comment={c}
            key={`comment-${idx}`}
            comments={comments}
            setComments={setComments}
            index={idx}
          />
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
