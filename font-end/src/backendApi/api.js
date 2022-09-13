import axios from 'axios'

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

export function uploadAlbum(album) {
  return __requestApi(0, 'uploadAlbum/', album)
}

export function getAllAlbum(param) {
  return __requestApi(1, 'getAllAlbum/', param)
}

export function addCollection(param) {
  return __requestApi(1, 'addCollection/', param)
}

export function delCollection(param) {
  return __requestApi(1, 'delCollection/', param)
}

export function getCollection(param) {
  return __requestApi(1, 'getCollection/', param)
}

export function getUploadAlbum(param) {
  return __requestApi(1, 'getUploadAlbum/', param)
}

export function getAnAlbumInfo(param) {
  return __requestApi(1, 'getAnAlbum/', param)
}

export function updateAlbum(param) {
  return __requestApi(0, 'updateAlbum/', param)
}

export function isAlbumGetInfo(param) {
  return __requestApi(1, 'isAlbumGetInfo/', param)
}

export function setAlbumGetState(param) {
  return __requestApi(1, 'setAlbumGetState/', param)
}

export function sendCommentRequest(param) {
  return __requestApi(1, 'sendComment/', param)
}

export function getComments(param) {
  return __requestApi(1, 'getComments/', param)
}

export function updateCommentLike(param) {
  return __requestApi(1, 'updateCommentLike/', param)
}

export function replyComment(param) {
  return __requestApi(1, 'replyCommit/', param)
}

export function updateTrackDuration(param) {
  return __requestApi(1, 'updateTrackDuration/', param)
}

export function updateTrackLastPlayTime(param) {
  return __requestApi(1, 'updateTrackLastPlayTime/', param)
}

export function getTrackLastPlayTime(param) {
  return __requestApi(1, 'getTrackLastPlayTime/', param)
}

export function updateTrackMusicUrl(param) {
  return __requestApi(1, 'updateTrackMusicUrl/', param)
}

export function getTracksInfo(param) {
  return __requestApi(1, 'getTracks/', param)
}

export function getAlbumTracks(keyword) {
  return axios({
    url: 'https://autumnfish.cn/search',
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
      let min = parseInt(songList[i].duration / 1000 / 60)
      let sec = parseInt((songList[i].duration / 1000) % 60)
      if (min < 10) {
        min = '0' + min
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      songList[i].duration = min + ':' + sec
    }
    // console.log(songList)
    return songList
  })
}

export function getMusicUrl(id) {
  return axios({
    url: 'https://autumnfish.cn/song/url',
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
