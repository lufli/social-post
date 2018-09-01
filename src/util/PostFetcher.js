import axios from 'axios'
import _ from 'lodash'

export default class PostFetcher {
  constructor () {
    this.url = `http://api.massrelevance.com/MassRelDemo/kindle.json`
  }

  fetch() {
    return axios.get(this.url).then(res => _.get(res, 'data', []).map(item => ({
      id: item.id,
      user_name: _.get(item, 'user.name'),
      avatar_url: _.get(item, 'user.profile_image_url'), 
      text: item.text,
      created_at: item.created_at,
      favorite_count: item.favorite_count,
      retweet_count: item.retweet_count,
    })))
  }
}