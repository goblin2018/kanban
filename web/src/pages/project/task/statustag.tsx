import React, { useState } from 'react'

interface Props {
  status: number
}

const l = [
  {
    desc: '未开始',
    color: '#aabbcc',
  },
  {
    desc: '进行中',
    color: '#1E90FF',
  },
  {
    desc: '已完成',
    color: '#00FF7F',
  },
]

const StatusTag: React.FC<Props> = ({ status }) => {
  return (
    <div
      className="px-3 py-1 rounded-full text-xs w-fit text-white"
      style={{ background: l[status].color }}
      onClick={(e) => e.preventDefault()}
    >
      <div>{l[status].desc}</div>
    </div>
  )
}

export default StatusTag
