import axios from '@/untils/request.js'
export const getActicles = params => {
  return axios({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
