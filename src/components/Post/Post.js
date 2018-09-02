import React from 'react'
import { List, Avatar, Button } from 'antd'
import IconText from './IconText'

const Post = ({post, onIgnorePost, loading}) => (
  <List.Item
    width="200px"
    actions={[
      <IconText type="clock-circle-o" text={post.created_at.format('DD/MM/YYYY HH:MM')} />,
      <IconText type="heart-o" text={post.favorite_count} />,
      <IconText type="retweet" text={post.retweet_count} />,
      <Button size="small" type="danger" ghost={true} disabled={loading} onClick={() => onIgnorePost(post.id)}>Ignore</Button>]}
  >
    <List.Item.Meta
      avatar={<Avatar src={post.avatar_url} />}
      title={<a href={post.avatar_url}>{post.user_name}</a>}
      description={post.text}
    />
  </List.Item>
)

export default Post