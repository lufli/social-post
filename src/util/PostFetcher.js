import axios from 'axios'
import _ from 'lodash'
import * as moment from 'moment'

export default class PostFetcher {
  constructor () {
    this.url = `http://api.massrelevance.com/MassRelDemo/kindle.json`
  }

  fetch(url, limit, start_id) {
    return axios.get(`${url}?limit=${limit}&start_id=${start_id}`).then(res => _.get(res, 'data', []).map(item => ({
      id: item.id_str,
      user_name: _.get(item, 'user.name'),
      avatar_url: _.get(item, 'user.profile_image_url'), 
      text: item.text,
      created_at: moment(item.created_at),
      favorite_count: item.favorite_count,
      retweet_count: item.retweet_count,
    })))
    .catch(error => {
      console.log(error)
      return []
    })
  }
}