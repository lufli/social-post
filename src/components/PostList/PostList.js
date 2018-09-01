import React, { Component } from 'react'
import { List } from 'antd'
import Post from '../Post/Post'

export default class PostList extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { posts } = this.props
    return (
      <List style={{width: '1000px'}}>
        {
          posts.map(post => (
            <Post key={post.id} post={post} />
          ))
        }
      </List>
    )
  }
}