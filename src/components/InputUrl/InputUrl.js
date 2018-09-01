import React, { Component } from 'react'
import { Button, Input } from 'antd'

export default class InputUrl extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div style={{display: 'flex'}}>
        <Input
          style={{width: '500px', 'marginRight': '8px'}}
          placeholder="Enter your seed URL"
          addonBefore="Seed URL"
          // suffix={suffix}
          onChange={() => {}}
        />
        <Button type="primary">Update</Button>
      </div>
    )
  }
}