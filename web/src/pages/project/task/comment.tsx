import { Button, Input, Popconfirm, Typography } from 'antd'
import { Comment, deleteComment, updateComment } from 'api/comment'
import { dateSuffix, toDateString } from 'api/utils'
import { useAppSelector } from 'app/hooks'
import UserAvatar from 'components/userAvatar'
import { useState } from 'react'

interface Props {
  comment: Comment
  comments: Comment[]
  setComments: (cs: Comment[]) => void
  index: number
}

const { Text } = Typography

const CommentTag: React.FC<Props> = ({
  comment,
  comments,
  setComments,
  index,
}) => {
  const user = useAppSelector((s) => s.user.my)
  const { suffix, info } = dateSuffix(comment.updatedAt!)
  const [hover, setHover] = useState(false)
  const isMy = comment?.user?.id == user?.id
  const [editInfo, setEditInfo] = useState(comment.info!)

  const [isEdit, setIsEdit] = useState(false)

  const submitEdit = () => {
    let ni = editInfo.trim()
    if (ni == '' || ni == comment.info) {
      cancel()
      return
    }

    updateComment({ id: comment.id, info: ni }).then((res) => {
      let nc = res.data as Comment
      let ncs = [...comments]
      ncs[index] = { ...ncs[index], info: ni, updatedAt: nc.updatedAt }
      setComments(ncs)
    })
    cancel()
  }

  const cancel = () => {
    setIsEdit(false)
    setHover(false)
  }

  return (
    <div
      className="mb-4"
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <div className="flex">
        {!isMy && (
          <div className="mr-2">
            <UserAvatar user={comment.user!} />
          </div>
        )}
        <div className=" mb-2 flex-1  bg-blue-50 rounded-lg p-2 relative">
          <div className="flex justify-between">
            <div className="text-bold">{comment.user?.name}</div>
            <div className="flex text-text-disabled">
              <div className="">{info}</div>
              <div className="ml-1">{suffix}</div>
            </div>
          </div>

          <div className="mt-1">
            {isEdit ? (
              <div>
                <Input.TextArea
                  value={editInfo}
                  onChange={(e) => {
                    setEditInfo(e.target.value)
                  }}
                />
              </div>
            ) : (
              <div>{comment.info}</div>
            )}
          </div>
          <div
            className="flex absolute right-0 -bottom-6"
            style={{
              display: isMy ? '' : 'none',
            }}
          >
            {hover && !isEdit && (
              <div>
                <Popconfirm
                  title={'确定删除评论？'}
                  onConfirm={() => {
                    deleteComment({ id: comment.id })
                    let ncs = [...comments]
                    ncs.splice(index, 1)
                    setComments(ncs)
                  }}
                >
                  <Text underline className="cursor-pointer" onClick={() => {}}>
                    删除
                  </Text>
                </Popconfirm>
                <Text
                  className="ml-2 cursor-pointer"
                  onClick={() => {
                    setIsEdit(true)
                  }}
                  underline
                >
                  编辑
                </Text>
              </div>
            )}

            {isEdit && (
              <div>
                <Text underline className="cursor-pointer" onClick={cancel}>
                  取消
                </Text>
                <Text
                  className="ml-2 cursor-pointer"
                  onClick={() => {
                    submitEdit()
                  }}
                  underline
                >
                  确认
                </Text>
              </div>
            )}
          </div>
        </div>

        {isMy && (
          <div className="ml-2">
            <UserAvatar user={comment.user!} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentTag
