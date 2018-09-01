import React, { Component } from 'react'
import { Select } from 'antd'

export default class PostSelect extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Select size="small" style={{ width: 120 }}>
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
      </Select>
    )
  }
}
