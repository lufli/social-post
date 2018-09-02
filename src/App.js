import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'
import { Button, Input } from 'antd'
import PostFetcher from './util/PostFetcher'
import PostSelect from './components/PostSelect/PostSelect'
import PostList from './components/PostList/PostList'
import { NUMBER_TO_DISPLAY_OPTIONS, UPDATE_INTERVAL_OPTIONS } from './util/Instance'

class App extends Component {
  constructor() {
    super()
    this.fetcher = new PostFetcher()
    this.state = {
      inputValue: `http://api.massrelevance.com/MassRelDemo/kindle.json`,
      posts: [],
      ignorePosts: [],
      feedUrl: `http://api.massrelevance.com/MassRelDemo/kindle.json`,
      start_id: null,
      numberToDisplay: NUMBER_TO_DISPLAY_OPTIONS[0],
      updatedInterval: UPDATE_INTERVAL_OPTIONS[0],
      loading: true,
    }
    this.interval = null
    this.onLoading = this.onLoading.bind(this)
    this.fetchPost = this.fetchPost.bind(this)
    this.onNumberToDisplayChange = this.onNumberToDisplayChange.bind(this)
    this.onUpdatedIntervalChange = this.onUpdatedIntervalChange.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onUpdateSettings = this.onUpdateSettings.bind(this)
    this.onIgnorePost = this.onIgnorePost.bind(this)
    this.preparedDate = this.preparedDate.bind(this)
  }

  onLoading (callback) {
    this.setState({
      ...this.state,
      loading: true
    }, callback)
  }

  fetchPost () {
    const { feedUrl, numberToDisplay, start_id } = this.state
    this.fetcher.fetch(feedUrl, numberToDisplay.value, start_id).then(posts => {
      const last = _.last(posts)
      this.setState({
        ...this.state,
        posts,
        start_id: last ? last.id : null,
        loading: false
      })
    })
  }

  fetchOne () {
    const { feedUrl, start_id } = this.state
    this.fetcher.fetch(feedUrl, 1, start_id).then(posts => {
      const post = posts[0]
      this.setState((prevState, props) => ({
        ...this.state,
        posts: [...prevState.posts, post],
        start_id: post ? post.id : null,
        loading: false
      }))
    })
  }

  componentDidMount () {
    this.fetchPost()
    this.interval = setInterval(() => this.onLoading(this.fetchPost), this.state.updatedInterval.value)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  onNumberToDisplayChange(value, option) {
    this.setState({
      ...this.state,
      numberToDisplay: {
        text: option.props.children,
        value,
      }
    })
  }

  onUpdatedIntervalChange(value, option) {
    this.setState({
      ...this.state,
      updatedInterval: {
        text: option.props.children,
        value,
      }
    })
  }

  onInputChange (e) {
    this.setState({
      ...this.state,
      inputValue: e.target.value
    })
  }

  onUpdateSettings (e) {
    clearInterval(this.interval)
    this.interval = setInterval(() => this.onLoading(this.fetchPost), this.state.updatedInterval.value)
    this.setState({
      ...this.state,
      feedUrl: this.state.inputValue,
      posts: [],
      ignorePosts: [],
      start_id: null
    }, () => this.onLoading(this.fetchPost))
  }

  onIgnorePost (id) {
    this.setState((prevState, props) => ({
      ...prevState,
      ignorePosts: [...prevState.ignorePosts, id]
    }), () => this.onLoading(this.fetchOne))
  }

  preparedDate () {
    return _.filter(this.state.posts, (o) => !this.state.ignorePosts.includes(o.id))
  }

  render() {
    return (
      <div className="app">
        <h1>Social Post Dashboard</h1>
        <div style={{display: 'flex'}}>
          <Input
            value={this.state.inputValue}
            style={{width: '500px', 'marginRight': '8px'}}
            placeholder="Enter your seed URL"
            addonBefore="Seed URL"
            onChange={this.onInputChange}/>
        </div>
        <p>Current seed url: {this.state.feedUrl}</p>
        <div className="app-item">
          <div>
            <span>Number of posts to display: </span>
            <PostSelect
              value={this.state.numberToDisplay.text}
              options={NUMBER_TO_DISPLAY_OPTIONS}
              onChange={this.onNumberToDisplayChange}/>
          </div>
          <div>
            <span>Update interval: </span>
            <PostSelect
              value={this.state.updatedInterval.text}
              options={UPDATE_INTERVAL_OPTIONS}
              onChange={this.onUpdatedIntervalChange}/>
          </div>
          <div>
            <Button type="primary" size="small" onClick={this.onUpdateSettings} loading={this.state.loading}>Update Settings</Button> 
          </div>
        </div>
        <hr />
        <PostList className="app-item" posts={this.preparedDate()} onIgnorePost={this.onIgnorePost} loading={this.state.loading}/>
      </div>
    );
  }
}

export default App;
