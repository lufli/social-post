import React, { Component } from 'react'
import { List, Avatar } from 'antd'
import IconText from './IconText'

export default class Post extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <List.Item
        width="200px"
        actions={[
          <IconText type="heart-o" text={this.props.post.favorite_count} />,
          <IconText type="retweet" text={this.props.post.retweet_count} />,
          <IconText type="close" />]}
      >
        <List.Item.Meta
          avatar={<Avatar src={this.props.post.avatar_url} />}
          title={<a href={this.props.post.avatar_url}>{this.props.post.user_name}</a>}
          description={this.props.post.text}
        />
      </List.Item>
    )
  }
}