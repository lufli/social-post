import React from 'react'
import { List } from 'antd'
import Post from '../Post/Post'

const PostList = ({ posts, onIgnorePost, loading }) => (
  <List style={{width: '1200px'}}>
    {
      posts.map(post => (
        <Post key={post.id} post={post} onIgnorePost={onIgnorePost} loading={loading}/>
      ))
    }
  </List>
)

export default PostList