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
    return (dispatch) => (
        http.post(tools.domain + '/api/article/detail/', { pId: pId, author: author, content: content }, function (data) {
            dispatch({ type: types.ADD_COMMENT_SUCCESS, result: data })
        }, function (err) {
            dispatch({ type: types.ADD_COMMENT_FAIL, result: data })
            console.log(err);
        }, dispatch)
    )
}
