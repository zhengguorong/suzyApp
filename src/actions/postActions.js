/**
 *  文章相关action
 */
import http from '../util/http'
import * as types from '../constants/ActionTypes'
import tools from '../util/tools'

/**
 * 获取文章列表
 */
export const getPosts = (page, count) => {
    return (dispatch) => {
        dispatch({ type: types.FRESH_POST_START })
        http.get(tools.domain + '/api/article/?page=' + page + '&count=' + count, function (data) {
            dispatch({ type: types.FRESH_POST_FINISH })
            dispatch({ type: types.FETCH_POST_LIST, posts: data, page: page })
        }, function (err) {
            console.log(err); dispatch({ type: types.FRESH_POST_FINISH })
        }, dispatch)
    }
}
/**
 * 获取文章详情
 */
export const getPostDetail = (id) => {
    return (dispatch) => (
        http.get(tools.domain + '/api/article/detail/' + id, function (data) {
            dispatch({ type: types.FETCH_POST_DETAIL, post: data })
        }, function (err) { console.log(err) }, dispatch)
    )
}
/**
 * 添加评论
 */
export const addComment = (pId, author, content) => {
    return (dispatch) => {
        http.post(tools.domain + '/api/reply/', { pId: pId, author: author, content: content }, function (data) {
            dispatch({ type: types.ADD_COMMENT_SUCCESS, result: data })
        }, function (err) {
            dispatch({ type: types.ADD_COMMENT_FAIL, result: err })
            console.log(err);
        }, dispatch)
    }
}
/**
 * 点赞
 */
export const like = (id)=>{
    return (dispatch) => {
        http.put(tools.domain + '/api/article/'+id, {like:1},function (data) {
            console.log('like',data)
            dispatch({ type: types.LIKE_SUCCESS, result: data })
        }, function (err) {
            dispatch({ type: types.LIKE_FAIL, result: err })
            console.log(err);
        }, dispatch)
    }    
}
/**
 * 取消点赞
 */
export const unlike = (id)=>{
    return (dispatch) => {
        http.put(tools.domain + '/api/article/'+id, {like:0},function (data) {
            dispatch({ type: types.UNLIKE_SUCCESS, result: data })
        }, function (err) {
            dispatch({ type: types.UNLIKE_FAIL, result: err })
            console.log(err);
        }, dispatch)
    }    
}