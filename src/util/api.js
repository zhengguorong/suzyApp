import {http, crossHttp} from './http'

/**
 * 获取文章列表
 */
export const getPosts = (page, count) => {
  return http.get('/api/article/?page=' + page + '&count=' + count)
}

/**
 * 获取like文章列表
 */
export const getLikePosts = (page, count) => {
  return http.get('/api/article/like?page=' + page + '&count=' + count)
}

/**
 * 获取文章列表
 */
export const getNextPosts = (page, count) => {
  return http.get('/api/article/?page=' + page + '&count=' + count)
}

/**
 * 获取Like文章列表
 */
export const getNextLikePosts = (page, count) => {
  return http.get('/api/article/like?page=' + page + '&count=' + count)
}

/**
 * 获取文章详情
 */
export const getPostDetail = (id) => {
  return http.get('/api/article/detail/' + id)
}

/**
 * 添加评论
 */
export const addComment = ({pId, author, content}) => {
  return http.post('/api/reply/', { pId: pId, author: author, content: content })
}

/**
 * 点赞
 */
export const like = (id) => {
  return http.put('/api/article/' + id, { like: 1 })
}

/**
 * 取消点赞
 */
export const unlike = (id) => {
  return http.put('/api/article/' + id, { like: 0 })
}

/**
 * 添加文章
 */
export const addPost = ({title, content, author, fileData}) => {
  return http.post('/api/article/', { title: title, content: content, author: author, fileData: fileData })
}

/**
 * 更新文章
 */
export const updatePost = ({id, title, content, author, fileData}) => {
  return http.put('/api/article/' + id, { title: title, content: content, author: author, fileData: fileData })
}

/**
 * 获取cover
 */
export const updateCover = () => {
   return crossHttp.get('http://news-at.zhihu.com/api/4/start-image/1080*1776')
}