import axios from '@/untils/request'
// import store from '@/store'
export const login = data => {
  return axios({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export const sendSms = mobile => {
  return axios({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfo = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/user'
    // 请求数据的请求头
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 获取用户频道列表
export const getUserChannels = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
