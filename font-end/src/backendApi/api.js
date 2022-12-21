import axios from 'axios'
import qs from 'qs'

function __requestApi(isGet, url, param) {
  return axios.request({
    url: 'api/' + url,
    method: isGet ? 'get' : 'post',
    params: param
  }).then(res => {
    return res
  }).catch(e => {
    console.log(e)
  })
}

function __postFormApi(url, param) {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(param),
    url: 'api/' + url
  }
  return axios(options).then(res => {
    return res
  }).catch(e => {
    console.log(e)
  })
}

// 用户注册、登录等api
export function userLogin(param) {
  return __requestApi(0, 'login/', param)
}

export function userRegister(userInfo) {
  return __requestApi(0, 'register/', userInfo)
}

export function userInfo(token) {
  return __requestApi(1, 'getUserInfo/', token)
}

export function getAuthCode(param) {
  return __requestApi(1, 'getAuthCode/', param)
}

export function updateUserPassword(param) {
  return __requestApi(0, 'updatePassword/', param)
}

// 专辑相关的api

export function uploadAlbum(album) {
  return __postFormApi('uploadAlbum/', album)
}

export function updateAlbum(param) {
  return __postFormApi('updateAlbum/', param)
}

export function getAllAlbum(param) {
  return __requestApi(1, 'getAllAlbum/', param)
}

export function getAllAlbumName(param) {
  return __requestApi(1, 'getAllAlbumName/', param)
}

export function getUploadAlbum(param) {
  return __requestApi(1, 'getUploadAlbum/', param)
}

export function getAnAlbumInfo(param) {
  return __requestApi(1, 'getAnAlbum/', param)
}

export function isAlbumGetInfo(param) {
  return __requestApi(1, 'isAlbumGetInfo/', param)
}

export function setAlbumGetState(param) {
  return __requestApi(1, 'setAlbumGetState/', param)
}

// 收藏相关的api

export function addCollection(param) {
  return __requestApi(1, 'addCollection/', param)
}

export function delCollection(param) {
  return __requestApi(1, 'delCollection/', param)
}

export function getCollection(param) {
  return __requestApi(1, 'getCollection/', param)
}

// 评论api

export function sendCommentRequest(param) {
  return __requestApi(1, 'sendComment/', param)
}

export function getComments(param) {
  return __requestApi(1, 'getComments/', param)
}

export function updateCommentLike(param) {
  return __requestApi(1, 'updateCommentLike/', param)
}

export function updateReplyLike(param) {
  return __requestApi(1, 'updateReplyLike/', param)
}

export function replyComment(param) {
  return __requestApi(1, 'replyCommit/', param)
}

// 歌曲api

export function updateTrack(param) {
  return __requestApi(1, 'updateTrack/', param)
}

export function updateTrackLastPlayTime(param) {
  return __requestApi(1, 'updateTrackLastPlayTime/', param)
}

export function getTrackLastPlayTime(param) {
  return __requestApi(1, 'getTrackLastPlayTime/', param)
}

export function getTracksInfo(param) {
  return __requestApi(1, 'getTracks/', param)
}

// 获得所有歌手的名字
export function getAllArtist(param) {
  return __requestApi(1, 'getAllArtist/', param)
}

// 外部api

export function getAlbumTracks(keyword) {
  return axios({
    url: 'http://140.82.50.156:3000/search',
    method: 'get',
    params: {
      keywords: keyword,
      type: 1,
      // 获取的数据量
      limit: 15
    }
  }).then(res => {
    const songList = res.data.result.songs
    // console.log('before: ', songList)
    // 计算歌曲时间
    for (let i = 0; i < songList.length; i++) {
      const dt = songList[i].dt
      let min = parseInt(dt / 1000 / 60)
      let sec = parseInt((dt / 1000) % 60)
      if (min < 10) {
        min = '0' + min
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      songList[i].dt = min + ':' + sec
      songList[i] = { 'artist': songList[i].ar, 'track': songList[i].al,
        'duration': songList[i].dt, 'name': songList[i].name, 'id': songList[i].id }
    }
    // console.log(songList)
    return songList
  })
}

export function getMusicUrl(id) {
  return axios({
    // url: 'https://autumnfish.cn/song/url/v1',
    url: 'http://140.82.50.156:3000/song/url',
    method: 'get',
    params: {
      id // id:id
    }
  }).then(res => {
    return res
  }).catch(e => {
    console.log(e)
  })
}
