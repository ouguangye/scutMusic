import { getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { userInfo } from '@/backendApi/api'

const getDefaultState = () => {
  return {
    id: '',
    token: getToken(),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID: (state, uid) => {
    state.id = uid
  }
}

const actions = {
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // user login
  login({ commit }, userInfo) {
    console.log(userInfo)
    const { username, userId, avatarImage } = userInfo
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', username)
      commit('SET_NAME', username)
      commit('SET_ID', userId)
      commit('SET_AVATAR', avatarImage || getDefaultState()['avatar'])
      resolve()
    })
  },

  // user getInfo
  getUserInfo: async({ commit }) => {
    console.log(getToken())
    const res = await userInfo({ 'token': getToken() })
    if (res.data.msg === 'success') {
      commit('SET_NAME', res.data.result.username)
      commit('SET_ID', res.data.result.userId)
      commit('SET_AVATAR', res.data.result.avatarImage || getDefaultState()['avatar'])
    } else {
      console.error(res.data.msg)
    }
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

