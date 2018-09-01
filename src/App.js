import React, { Component } from 'react'
import './App.css'
import PostFetcher from './util/PostFetcher'
import InputUrl from './components/InputUrl/InputUrl'
import PostSelect from './components/PostSelect/PostSelect'
import PostList from './components/PostList/PostList'

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      feedUrl: `http://api.massrelevance.com/MassRelDemo/kindle.json`,
      numberToDisplay: 10,
      updatedInterval: 60*1000
    }
    this.fetcher = new PostFetcher()
  }

  componentDidMount () {
    this.fetcher.fetch().then(posts => {
      this.setState({
        ...this.state,
        posts,
      })
    })
  }

  render() {
    console.log(this.state.posts)
    return (
      <div className="app">
        <h1>Social Post Dashboard</h1>
        <InputUrl className="app-item"/>
        <div className="app-item">
          <span>Number of posts to display: </span>
          <PostSelect label="Number of posts to display"/>
        </div>
        <div className="app-item">
          <span>Update interval: </span>
          <PostSelect label="Number of posts to display"/>
        </div>
        <PostList className="app-item" posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
