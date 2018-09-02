import React from 'react'
import { Select } from 'antd'

const PostSelect = ({ value, onChange, options}) => (
  <Select value={value} size="small" style={{ width: 120 }} onChange={onChange}>
    {
      options.map((option) => (
        <Select.Option key={option.value} value={option.value}>{option.text}</Select.Option>
      ))
    }
  </Select>
)

export default PostSelect
